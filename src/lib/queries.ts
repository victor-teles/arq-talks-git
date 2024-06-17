import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, TablesInsert } from './database.types';

type Commit = TablesInsert<'commits'>;

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
