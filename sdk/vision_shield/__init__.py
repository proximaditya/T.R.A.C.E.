"""
Compatibility wrapper for legacy VisionShield references.
Redirects to T.R.A.C.E. (Tamper-Proof Record and AI Compliance Engine).
"""

from trace.cryptography import ProvenanceBinder
from trace.fpd_scanner import FakePreferenceDetector

__all__ = ["ProvenanceBinder", "FakePreferenceDetector"]
