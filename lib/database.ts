import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { Entry, GroupPick, KnockoutPick } from "@/lib/types";

export async function getCurrentUser() {
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signUpWithEntry(email: string, password: string, displayName: string, poolCode: string) {
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName, pool_code: poolCode } },
  });

  if (error) throw error;
  if (!data.user) throw new Error("No user was returned after signup.");

  await upsertEntry({
    id: data.user.id,
    userId: data.user.id,
    displayName,
    email,
    poolCode,
    paid: false,
    groupPicks: {},
    knockoutPicks: {},
    tiebreakers: {},
    groupScore: 0,
    knockoutScore: 0,
    totalScore: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return data.user;
}

export async function signIn(email: string, password: string) {
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function sendPasswordReset(email: string) {
  assertSupabaseConfigured();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function upsertEntry(entry: Entry) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("entries").upsert({
    id: entry.id,
    user_id: entry.userId,
    display_name: entry.displayName,
    email: entry.email,
    pool_code: entry.poolCode,
    group_picks: entry.groupPicks,
    knockout_picks: entry.knockoutPicks,
    tiebreakers: entry.tiebreakers,
    group_score: entry.groupScore,
    knockout_score: entry.knockoutScore,
    total_score: entry.totalScore,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
  });
  if (error) throw error;
}

export async function saveGroupPick(poolCode: string, userId: string, matchId: string, pick: GroupPick) {
  assertSupabaseConfigured();
  const { data, error: readError } = await supabase
    .from("entries")
    .select("group_picks")
    .eq("pool_code", poolCode)
    .eq("user_id", userId)
    .single();
  if (readError) throw readError;

  const groupPicks = { ...((data?.group_picks as Record<string, GroupPick>) || {}), [matchId]: pick };
  const { error } = await supabase
    .from("entries")
    .update({ group_picks: groupPicks, updated_at: new Date().toISOString() })
    .eq("pool_code", poolCode)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function saveKnockoutPick(poolCode: string, userId: string, matchId: string, pick: KnockoutPick) {
  assertSupabaseConfigured();
  const { data, error: readError } = await supabase
    .from("entries")
    .select("knockout_picks")
    .eq("pool_code", poolCode)
    .eq("user_id", userId)
    .single();
  if (readError) throw readError;

  const knockoutPicks = { ...((data?.knockout_picks as Record<string, KnockoutPick>) || {}), [matchId]: pick };
  const { error } = await supabase
    .from("entries")
    .update({ knockout_picks: knockoutPicks, updated_at: new Date().toISOString() })
    .eq("pool_code", poolCode)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function saveTiebreakers(poolCode: string, userId: string, tiebreakers: Entry["tiebreakers"]) {
  assertSupabaseConfigured();
  const { error } = await supabase
    .from("entries")
    .update({ tiebreakers, updated_at: new Date().toISOString() })
    .eq("pool_code", poolCode)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function listEntries(poolCode: string) {
  assertSupabaseConfigured();
  const { data, error } = await supabase.from("entries").select("*").eq("pool_code", poolCode);
  if (error) throw error;
  return data;
}

export async function markPaid(poolCode: string, userId: string, paid: boolean) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("entry_payments").upsert({
    pool_code: poolCode,
    user_id: userId,
    paid,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured yet. Add the Supabase URL and anon key to .env.local.");
  }
}
