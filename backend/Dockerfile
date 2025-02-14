FROM ruby:3.1.1

# Adding postgres lib
RUN apt update

ENV DEBIAN_FRONTEND=noninteractive
RUN apt install -y nano
RUN apt install -y libpq-dev
RUN apt install -y tini
RUN apt install -y gettext
RUN apt install -y supervisor

# Set an environment variable where the Rails app is installed to inside of Docker image:
ENV RAILS_ROOT /srv/ba/current
RUN mkdir -p $RAILS_ROOT

# Set working directory, where the commands will be ran:
WORKDIR $RAILS_ROOT

# Adding project files
RUN rm -rf /srv/ba/current
COPY Gemfile /srv/ba/current/Gemfile
COPY Gemfile.lock /srv/ba/current/Gemfile.lock
RUN gem install bundler:2.4.13
RUN bundle install --jobs 20 --retry 5

COPY . .
RUN mkdir -p ./tmp/pids
RUN mkdir -p ./log
RUN mkdir -p /tmp/sockets

# Run server
EXPOSE 8080

# Fix protobuf error on cloudtasker
COPY cloudtasker_fix/worker_handler.rb /usr/local/rbenv/versions/3.1.1/lib/ruby/gems/3.1.0/gems/cloudtasker-0.13.0/lib/cloudtasker/worker_handler.rb
COPY cloudtasker_fix/google_cloud_task_v2.rb /usr/local/rbenv/versions/3.1.1/lib/ruby/gems/3.1.0/gems/cloudtasker-0.13.0/lib/cloudtasker/backend/google_cloud_task_v2.rb

# Entrypoint
RUN sed -i 's/\r$//' /srv/ba/current/entrypoint.sh
RUN chmod +x /srv/ba/current/entrypoint.sh
ENTRYPOINT ["bash", "/srv/ba/current/entrypoint.sh"]
