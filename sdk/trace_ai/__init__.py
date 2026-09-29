"""
T.R.A.C.E. AI Security SDK alias (trace_ai).
Exposes the three core Computer Vision Integrity Assurance pillars:
  - ProvenanceBinder (Inference cryptographic provenance & tamper detection)
  - FakePreferenceDetector (Data integrity & near-duplicate flooding detection)
  - ModelAuditor (Model weight integrity & backdoor trigger scan)
"""

from trace_engine import ProvenanceBinder, FakePreferenceDetector, ModelAuditor

__version__ = "1.0.0"
__all__ = ["ProvenanceBinder", "FakePreferenceDetector", "ModelAuditor"]
