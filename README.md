# MTUSDA

Mobile-first church app for MTUSDA in Kinshasa: Bible (Louis Segond 1910 and KJV), hymns, sample Sabbath lessons, and community.

## Run
npm install
cp .env.example .env.local
npm run dev

## Demo
demo@mtusda.org / mtusda-demo

## Content rights
Shipped texts are public domain or original samples. The official SDA hymnal and current Sabbath School quarterly are not included. French hymn lines marked as MTUSDA adaptations are original wording from public-domain English sources. Ellen G. White books are the pre-1930 public-domain editions (Steps to Christ 1892, The Desire of Ages 1898, The Great Controversy 1911) from CCEL, chapters only.

## Data
The Supabase organization is already at its two active free projects (Apporte and Boutik), so this app stores accounts, bookmarks, notes, announcements, events, and posts in Neon (eu-west-2), with ownership checks in the API. Bible and book files ship in the repo.
