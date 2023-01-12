CREATE TABLE songs_table(
   id SERIAL PRIMARY KEY,
   song_title VARCHAR NOT NULL,
   singer VARCHAR,
   album VARCHAR,
   duration VARCHAR
);

CREATE TABLE PlayList (
    PlayListName VARCHAR NOT NULL,
    Song_id NUMERIC 
);


insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Valaiyosai','Ilayaraja','Satya','300s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'En Jodi','Ilayaraja','Vikram','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Mallipoo','AR Rahman','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Ponge Nadhi','PS1','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Valaiyosai1','Ilayaraja','Satya','300s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'En Jodi1','Ilayaraja','Vikram','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Mallipoo1','AR Rahman','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Ponge Nadhi1','PS1','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Valaiyosai2','Ilayaraja','Satya','300s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'En Jodi2','Ilayaraja','Vikram','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Mallipoo2','AR Rahman','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Ponge Nadhi2','PS1','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Valaiyosai3','Ilayaraja','Satya','300s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'En Jodi3','Ilayaraja','Vikram','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Mallipoo3','AR Rahman','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Ponge Nadhi3','PS1','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Valaiyosai4','Ilayaraja','Satya','300s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'En Jodi4','Ilayaraja','Vikram','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Mallipoo4','AR Rahman','VTK','283s');
insert into songs_table (id,song_title,singer,album,duration) values (DEFAULT,'Ponge Nadhi4','PS1','VTK','283s');


insert into PlayList(PlayListName,Song_id) values ('Anantha',1);
insert into PlayList(PlayListName,Song_id) values ('Anantha',3);
insert into PlayList(PlayListName,Song_id) values ('Anantha',5);
insert into PlayList(PlayListName,Song_id) values ('Krishnan',11);
insert into PlayList(PlayListName,Song_id) values ('Anantha',13);
insert into PlayList(PlayListName,Song_id) values ('Anantha',15);


