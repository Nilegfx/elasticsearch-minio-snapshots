// create a document
POST /ahmed/doc/1
{"name": "ayoub"}

// check that there is no repositories
GET _snapshot

// create repository
PUT _snapshot/my_s3_repository
{
  "type": "s3",
  "settings": {
    "bucket": "elasticsearch",
    "endpoint": "127.0.0.1:9000",
    "protocol": "http"
  }
}

// create first snapshot `name=ayoub`
PUT /_snapshot/my_s3_repository/snapshot_1?wait_for_completion=true

// ensure that the first snapshot exists
GET /_snapshot/my_s3_repository/snapshot_1

// change the doc in original index `ahmed` 
// so the `name=nile`
POST /ahmed/doc/1
{"name": "nile"}

// ensure the change
GET /ahmed/doc/1

// restore the snapshot with the `name=ayoub`
// to another index `restored_ahmed`
POST /_snapshot/my_s3_repository/snapshot_1/_restore
{
  "rename_pattern": "(.+)",
  "rename_replacement": "restored_$1"
}

// ensure that `name=ayoub` (the old)
GET /restored_ahmed/doc/1

// ensure that the `name=nile` (the latest)
GET /ahmed/doc/1

