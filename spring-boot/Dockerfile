#
# Build stage
#
FROM maven:3.8.1-openjdk-8-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -U -T 0.5C -DdependencyLocationsEnabled=false

#
# Package stage
#
FROM openjdk:8-jre-slim
COPY --from=build /home/app/target/country-service-1.0-SNAPSHOT.jar /usr/local/lib/country-service.jar
EXPOSE 8080
ENTRYPOINT ["java","-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom","-jar","/usr/local/lib/country-service.jar"]
