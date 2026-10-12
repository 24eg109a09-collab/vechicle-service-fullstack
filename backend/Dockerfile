FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy context files to support both repo root context and backend/ subfolder context
COPY . /staging/

RUN if [ -f /staging/backend/pom.xml ]; then \
        cp /staging/backend/pom.xml ./pom.xml && \
        cp -r /staging/backend/src ./src; \
    else \
        cp /staging/pom.xml ./pom.xml && \
        cp -r /staging/src ./src; \
    fi && \
    rm -rf /staging

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/vehicleservice-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]