import type { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Database, TablesInsert } from '../database.types';

type Commit = TablesInsert<'commits'>;
type Game = TablesInsert<'game'>;

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getGame = cache(async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data } = await supabase.from('game').select('*').eq('userId', userId).single();
  return data;
});

export const createCommit = async (supabase: SupabaseClient<Database>, commit: Commit) => {
  const { error } = await supabase.from('commits').insert(commit);

  if (error) throw new Error(`Falha ao registrar seu commit: ${error.message}`);
};

export const listCommits = async (supabase: SupabaseClient<Database>, limit = 10) => {
  const { data } = await supabase.from('commits').select('*').order('createdAt', { ascending: false }).limit(limit);

  return data;
};

export const listRanking = async (supabase: SupabaseClient<Database>, limit = 5) => {
  const { data } = await supabase.rpc('list_ranking', { maxranking: limit });

  return data;
};

export const myRanking = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data } = await supabase.rpc('get_my_ranking', { userid: userId }).single();

  return data;
};

export const upsertGame = async (supabase: SupabaseClient<Database>, game: Game) => {
  const { data } = await supabase.from('game').upsert({ ...game });
  return data;
};
