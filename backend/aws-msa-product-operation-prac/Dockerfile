FROM amazoncorretto:17.0.7-al2023-headless

VOLUME /tmp

COPY build/libs/aws-msa-product-service-1.0.jar product-service.jar

ENTRYPOINT ["java","-jar","product-service.jar"]