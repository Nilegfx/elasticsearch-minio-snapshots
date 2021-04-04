FROM docker.elastic.co/elasticsearch/elasticsearch:6.8.15
WORKDIR /usr/share/elasticsearch

RUN bin/elasticsearch-plugin install --batch repository-s3
RUN echo y | bin/elasticsearch-keystore create
RUN echo "minioadmin" | bin/elasticsearch-keystore add --stdin s3.client.default.access_key
RUN echo "minioadmin" | bin/elasticsearch-keystore add --stdin s3.client.default.secret_key
