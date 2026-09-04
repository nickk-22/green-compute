from app.config import get_settings

_client = None


def get_supabase():
    """Return a Supabase client using the service role key (backend only)."""
    global _client
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_service_role_key:
        return None
    if _client is None:
        from supabase import create_client

        _client = create_client(settings.supabase_url, settings.supabase_service_role_key)
    return _client
