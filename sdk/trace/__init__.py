"""
T.R.A.C.E. (Tamper-Proof Record and AI Compliance Engine) SDK
Trusted AI. Verified Intelligence. Zero-Trust Provenance.
Designed for Ministry of Defence (MoD) / Indian Army (DGIS) AI Assurance.
"""

from .cryptography import ProvenanceBinder
from .fpd_scanner import FakePreferenceDetector

__version__ = "1.0.0"
__all__ = ["ProvenanceBinder", "FakePreferenceDetector"]
