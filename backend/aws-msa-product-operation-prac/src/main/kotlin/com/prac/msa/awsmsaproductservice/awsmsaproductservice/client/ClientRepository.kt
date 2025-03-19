package com.prac.msa.awsmsaproductservice.awsmsaproductservice.client

import com.prac.msa.awsmsaproductservice.awsmsaproductservice.entity.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ClientRepository : JpaRepository<Product, Long>