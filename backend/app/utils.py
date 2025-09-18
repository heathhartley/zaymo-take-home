import hashlib

def generate_short_key(url: str) -> str:
    """Create a short key based on URL hash."""
    return hashlib.md5(url.encode()).hexdigest()[:6]
