package com.prac.msa.awsmsaproductservice.awsmsaproductservice.client

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ClientService(
    private val clientRepository: ClientRepository
) {

    fun isProductExists(productId: Long): Boolean {
        return clientRepository.existsById(productId)
    }

    fun getProductNamesByProductIds(productIds: List<Long>): List<Pair<Long, String>> {
        return clientRepository.findAllById(productIds).map { Pair(it.id, it.name) }
    }
}