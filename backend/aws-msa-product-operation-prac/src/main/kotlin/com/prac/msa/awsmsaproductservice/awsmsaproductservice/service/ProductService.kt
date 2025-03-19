package com.prac.msa.awsmsaproductservice.awsmsaproductservice.service

import com.prac.msa.awsmsaproductservice.awsmsaproductservice.entity.Product
import com.prac.msa.awsmsaproductservice.awsmsaproductservice.repository.ProductRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ProductService(private val productRepository: ProductRepository) {

    @Transactional
    fun addProduct(product: Product): Product {
        return productRepository.save(product)
    }

    @Transactional(readOnly = true)
    fun findAllProducts(): List<Product> {
        return productRepository.findAll()
    }
}
