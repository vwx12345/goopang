package com.prac.msa.awsmsaproductservice.awsmsaproductservice

import com.prac.msa.awsmsaproductservice.awsmsaproductservice.entity.Product
import com.prac.msa.awsmsaproductservice.awsmsaproductservice.repository.ProductRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class DataInitializer(
    private val productRepository: ProductRepository
) : CommandLineRunner {

    override fun run(vararg args: String) {
        val count = productRepository.count()
        if (count == 0L) {
            val product1 = Product(
                name = "macbook m1 max 64g",
                description = "22개월 무이자 할부 가능",
                price = 3_800_000
            )
            val product2 = Product(
                name = "iphone14 pro max",
                description = "12개월 무이자 할부 가능",
                price = 1_800_000
            )
            productRepository.save(product1)
            productRepository.save(product2)
        }
    }
}