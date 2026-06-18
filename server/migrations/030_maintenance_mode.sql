-- Add maintenance_mode key to site_settings (default 'false')
INSERT INTO site_settings (key, value)
VALUES ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;
