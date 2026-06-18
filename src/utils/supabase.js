import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Listings database functions
export async function getListings() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export async function getListingById(id) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

export async function createListing(listing) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating listing:', error);
    return null;
  }
}

export async function searchListings(filters) {
  try {
    let query = supabase.from('listings').select('*');

    if (filters.category) query = query.eq('category', filters.category);
    if (filters.minPrice) query = query.gte('price', filters.minPrice);
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
    if (filters.location)
      query = query.ilike('location', `%${filters.location}%`);

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching listings:', error);
    return [];
  }
}
