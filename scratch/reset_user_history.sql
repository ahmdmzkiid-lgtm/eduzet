-- Reset all user history/session data (make all accounts fresh)
-- Run this manually or via a one-time script

-- 1. Delete all UTBK tryout user answers first (FK dependency)
DELETE FROM user_answers;

-- 2. Delete all UTBK tryout sessions
DELETE FROM tryout_sessions;

-- 3. Delete all latihan (practice) sessions
DELETE FROM latihan_sessions;

-- 4. Delete all UM (Ujian Mandiri) tryout user answers
DELETE FROM um_user_answers;

-- 5. Delete all UM tryout sessions
DELETE FROM um_tryout_sessions;

-- 6. Delete all battle data
DELETE FROM battle_participants;
DELETE FROM battle_matches;
DELETE FROM battle_leaderboard;

-- 7. Delete all tryout registrations (if any exist)
-- (tryout_registrations table may not exist yet if migration hasn't run)
DO $$ BEGIN
  DELETE FROM tryout_registrations;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- 8. Delete all bookmarks
DELETE FROM bookmarks;
