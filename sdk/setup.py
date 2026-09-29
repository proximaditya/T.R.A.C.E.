from setuptools import setup, find_packages

setup(
    name="trace-ai-security",
    version="1.0.0",
    description="T.R.A.C.E. (Tamper-Proof Record and AI Compliance Engine) SDK - Military-grade computer vision assurance & zero-trust cryptographic provenance",
    author="DGIS / MoD AI Assurance Team",
    packages=find_packages(),
    install_requires=[
        "ecdsa>=0.19.0",
        "imagehash>=4.3.0",
        "scikit-learn>=1.4.0",
        "Pillow>=10.0.0",
        "numpy>=1.24.0",
    ],
    python_requires=">=3.9",
)
