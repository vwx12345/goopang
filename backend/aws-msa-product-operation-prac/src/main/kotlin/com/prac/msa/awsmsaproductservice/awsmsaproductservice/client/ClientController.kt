package com.prac.msa.awsmsaproductservice.awsmsaproductservice.client

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/products")
class ClientController(
    private val clientService: ClientService
) {

    @GetMapping("/{productId}/exists")
    fun isProductExists(
        @PathVariable productId: Long
    ): Boolean {
        return clientService.isProductExists(productId)
    }

    @GetMapping("/name")
    fun getProductNamesByProductIds(
        @RequestParam productIds: List<Long>
    ): List<Pair<Long, String>> {
        return clientService.getProductNamesByProductIds(productIds)
    }
}