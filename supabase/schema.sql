-- 1. gallery_items 테이블
create table if not exists gallery_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text default '',
  category    text not null check (category in ('시공 전후', '현장 시공', '장비 소개')),
  image_url   text not null,
  tag         text default '',
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- 2. RLS 활성화
alter table gallery_items enable row level security;

-- 3. 공개 읽기 허용 (갤러리 공개 페이지용)
create policy "public read"
  on gallery_items for select
  using (true);

-- 4. 로그인 사용자만 쓰기 허용 (관리자)
create policy "auth write"
  on gallery_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Storage 버킷 생성 (Supabase 대시보드에서 직접 생성 권장)
-- Storage > New bucket > 이름: gallery, Public: ON
