"""
Compatibility wrapper for legacy VisionShield references.
Redirects to T.R.A.C.E. (Tamper-Proof Record and AI Compliance Engine).
"""

from trace_engine import ProvenanceBinder, FakePreferenceDetector, ModelAuditor

__version__ = "1.0.0"
__all__ = ["ProvenanceBinder", "FakePreferenceDetector", "ModelAuditor"]
