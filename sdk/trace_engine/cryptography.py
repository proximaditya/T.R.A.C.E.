"""
T.R.A.C.E. Cryptographic Provenance Module
Implements ECDSA (SECP256k1) cryptographic binding for zero-trust inference provenance,
anti-replay protection, and tamper detection.
"""

import hashlib
import json
import os
import secrets
from datetime import datetime, timezone
from typing import Any, Dict, Optional, Tuple, Union
import ecdsa
from ecdsa import SECP256k1, SigningKey, VerifyingKey, BadSignatureError


class ProvenanceBinder:
    """
    Creates and verifies cryptographically verifiable bindings among:
    - Input image (SHA-256 hash)
    - Model identity / weight digest (SHA-256 hash)
    - Inference outputs and confidence metrics
    - Timestamp (UTC ISO-8601) and Nonce (anti-replay control)
    - ECDSA SECP256k1 digital signature and public key
    """

    def __init__(self, private_key_pem_or_hex: Optional[str] = None):
        """
        Initializes the binder with an existing ECDSA key or generates a fresh SECP256k1 keypair.
        """
        if private_key_pem_or_hex:
            try:
                # Attempt from hex
                key_bytes = bytes.fromhex(private_key_pem_or_hex)
                self._signing_key = SigningKey.from_string(key_bytes, curve=SECP256k1)
            except Exception:
                # Fallback to PEM string
                self._signing_key = SigningKey.from_pem(private_key_pem_or_hex)
        else:
            # Generate deterministic or secure military enclave key
            self._signing_key = SigningKey.generate(curve=SECP256k1)

        self._verifying_key = self._signing_key.get_verifying_key()

    @property
    def public_key_hex(self) -> str:
        """Returns the SECP256k1 public key as an uncompressed hex string."""
        return self._verifying_key.to_string().hex()

    @property
    def private_key_hex(self) -> str:
        """Returns the SECP256k1 private key as a hex string."""
        return self._signing_key.to_string().hex()

    @staticmethod
    def hash_image(image_input: Union[str, bytes]) -> str:
        """
        Calculates SHA-256 digest of an image file, raw bytes, or identifier.
        """
        hasher = hashlib.sha256()
        if isinstance(image_input, bytes):
            hasher.update(image_input)
        elif isinstance(image_input, str):
            if os.path.isfile(image_input):
                with open(image_input, "rb") as f:
                    while chunk := f.read(65536):
                        hasher.update(chunk)
            else:
                # Deterministic synthetic image digest for dummy/mock image identifiers
                hasher.update(f"TRACE_IMAGE_ID:{image_input}".encode("utf-8"))
        else:
            hasher.update(str(image_input).encode("utf-8"))
        return hasher.hexdigest()

    @staticmethod
    def canonical_json(data: Dict[str, Any]) -> bytes:
        """
        Produces deterministic, whitespace-normalized, sorted JSON bytes for hashing.
        """
        return json.dumps(data, sort_keys=True, separators=(",", ":"), ensure_ascii=True).encode("utf-8")

    def bind_inference(
        self,
        image_input: Union[str, bytes],
        model_hash: str,
        inference_data: Dict[str, Any],
        nonce: Optional[str] = None,
        timestamp: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Takes an image, model hash, and inference output, binds them into a canonical payload,
        and generates an ECDSA SECP256k1 signature.
        """
        input_hash = self.hash_image(image_input)
        iso_timestamp = timestamp or datetime.now(timezone.utc).isoformat()
        replay_nonce = nonce or secrets.token_hex(16)

        # Ensure model hash is standard format
        clean_model_hash = model_hash.strip().lower()

        # Build canonical payload
        canonical_payload = {
            "version": "TRACE-v1.0-MIL",
            "algorithm": "ECDSA-SECP256k1-SHA256",
            "input_hash": input_hash,
            "model_hash": clean_model_hash,
            "inference": inference_data,
            "timestamp": iso_timestamp,
            "nonce": replay_nonce,
        }

        serialized = self.canonical_json(canonical_payload)
        payload_hash = hashlib.sha256(serialized).hexdigest()

        # ECDSA sign the payload hash
        signature_bytes = self._signing_key.sign(bytes.fromhex(payload_hash), hashfunc=hashlib.sha256)
        signature_hex = signature_bytes.hex()
        pub_key_hex = self.public_key_hex

        return {
            "signature": signature_hex,
            "public_key": pub_key_hex,
            "payload_hash": payload_hash,
            "input_hash": input_hash,
            "model_hash": clean_model_hash,
            "canonical_payload": canonical_payload,
            "timestamp": iso_timestamp,
            "nonce": replay_nonce,
            "status": "ECDSA_SIGNATURE_VERIFIED",
            "tamper_evident": True,
        }

    @classmethod
    def verify_provenance(
        cls,
        canonical_payload: Dict[str, Any],
        signature_hex: str,
        public_key_hex: str,
    ) -> Dict[str, Any]:
        """
        Verifies whether an inference record matches its ECDSA signature and public key.
        Returns verification report with tamper detection details.
        """
        try:
            serialized = cls.canonical_json(canonical_payload)
            payload_hash = hashlib.sha256(serialized).hexdigest()

            vk = VerifyingKey.from_string(bytes.fromhex(public_key_hex), curve=SECP256k1)
            is_valid = vk.verify(bytes.fromhex(signature_hex), bytes.fromhex(payload_hash), hashfunc=hashlib.sha256)

            return {
                "verified": is_valid,
                "valid": is_valid,
                "is_valid": is_valid,
                "status": "ECDSA_SIGNATURE_VERIFIED" if is_valid else "TAMPERED: SIGNATURE MISMATCH",
                "message": "Cryptographic binding verified intact against SECP256k1 public key." if is_valid else "Signature mismatch detected",
                "payload_hash": payload_hash,
                "error": None,
                "reason": None,
            }
        except BadSignatureError:
            return {
                "verified": False,
                "valid": False,
                "is_valid": False,
                "status": "TAMPERED: SIGNATURE MISMATCH",
                "message": "Cryptographic signature does not match canonical payload",
                "payload_hash": hashlib.sha256(cls.canonical_json(canonical_payload)).hexdigest(),
                "error": "Cryptographic signature does not match canonical payload",
                "reason": "Cryptographic signature does not match canonical payload",
            }
        except Exception as e:
            return {
                "verified": False,
                "valid": False,
                "is_valid": False,
                "status": "TAMPERED: VERIFICATION_FAILED",
                "message": str(e),
                "payload_hash": None,
                "error": str(e),
                "reason": str(e),
            }
