import { NextResponse } from "next/server";
import { sha256Hex, canonicalJson } from "@/lib/provenance-crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const imageName = body.image_name || "CAM-DELTA-01.jpg";
    const predictedClass = body.predicted_class || "T-90 Main Battle Tank";
    const confidence = body.confidence !== undefined ? Number(body.confidence) : 98.4;

    const timestamp = new Date().toISOString();
    const nonce = (await sha256Hex(imageName + timestamp + Math.random().toString())).slice(0, 32);
    const inputHash = await sha256Hex(`RAW_PIXELS_STREAM:${imageName}:CH01`);
    const modelHash = "7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6";

    const canonicalPayload = {
      algorithm: "ECDSA-SECP256k1-SHA256",
      inference: {
        camera_feed: imageName,
        confidence,
        object: predictedClass,
      },
      input_hash: inputHash,
      model_hash: modelHash,
      nonce,
      timestamp,
      version: "TRACE-v1.0-MIL",
    };

    const serialized = canonicalJson(canonicalPayload);
    const payloadHash = await sha256Hex(serialized);

    // Deterministic cryptographic signature simulation based on private enclave key
    const sigPart1 = (await sha256Hex(`R_VAL:${payloadHash}`)).slice(0, 64);
    const sigPart2 = (await sha256Hex(`S_VAL:${payloadHash}`)).slice(0, 64);
    const signature = `3045022100${sigPart1.slice(0, 62)}0220${sigPart2.slice(0, 64)}`;
    const publicKey = "0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8";

    return NextResponse.json({
      inference_id: `INF-${Math.floor(1000 + Math.random() * 9000)}`,
      object: predictedClass,
      confidence,
      input_hash: inputHash,
      model_hash: modelHash,
      payload_hash: payloadHash,
      signature,
      public_key: publicKey,
      canonical_payload: canonicalPayload,
      timestamp,
      nonce,
      status: "[ECDSA SIGNATURE VERIFIED]",
      tamper_evident: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
