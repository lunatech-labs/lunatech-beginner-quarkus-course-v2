///usr/bin/env jbang "$0" "$@" ; exit $?
//JAVA 17+
//DEPS io.quarkus:quarkus-bom:3.5.1@pom
//DEPS io.quarkus:quarkus-hibernate-orm-rest-data-panache
//DEPS io.quarkus:quarkus-resteasy-reactive-links
//DEPS io.quarkus:quarkus-resteasy-reactive-jackson
//DEPS io.quarkus:quarkus-jdbc-h2
//JAVAC_OPTIONS -parameters
//JAVA_OPTIONS -Dquarkus.datasource.db-kind=h2 
//JAVA_OPTIONS -Dquarkus.datasource.jdbc.url=jdbc:h2:./products 
//JAVA_OPTIONS -Dquarkus.hibernate-orm.database.generation=drop-and-create

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import jakarta.persistence.Entity;

@Entity
class Product extends PanacheEntity {
    public String name;
    public Double price;
}

@ResourceProperties(path = "products")
interface ProductResource extends PanacheEntityResource<Product, Long> {
}
