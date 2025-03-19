package com.prac.msa.awsmsaproductservice.awsmsaproductservice.repository

import com.prac.msa.awsmsaproductservice.awsmsaproductservice.entity.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : JpaRepository<Product, Long>