package com.prac.msa.awsmsaproductservice.awsmsaproductservice.controller

import com.sun.management.OperatingSystemMXBean
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.lang.management.ManagementFactory
import java.net.InetAddress
import java.time.LocalDateTime
import kotlin.math.sqrt

@RestController
@RequestMapping("/api/products")
class SystemController {

    @GetMapping("/health_check")
    @Transactional(readOnly = true)
    fun healthCheck() = ResponseEntity.ok(
        mapOf(
            "status" to "OK",
            "message" to "Product Service is healthy",
            "ipAddress" to InetAddress.getLocalHost().hostAddress,
            "timestamp" to LocalDateTime.now(),
            "cpuUsage" to getCurrentCpuUsage()
        )
    )


    fun getCurrentCpuUsage(): Double {
        val osBean = ManagementFactory.getOperatingSystemMXBean() as OperatingSystemMXBean
        return osBean.cpuLoad * 100
    }

    @GetMapping("/cpu-load")
    fun cpuLoadTest(
        @RequestParam repeatNum: Int?
    ): String {
        val startTime = System.currentTimeMillis()
        val primes = generatePrimes(repeatNum ?: 50000) // 계산 집약적인 작업
        val endTime = System.currentTimeMillis()

        return "Found ${primes.size} primes in ${endTime - startTime} milliseconds"
    }

    // 소수 생성 함수 (CPU 사용량 증가)
    private fun generatePrimes(limit: Int): List<Int> {
        val primes = mutableListOf(2)
        var nextPrime = 3
        while (primes.size < limit) {
            var isPrime = true
            val sqrt = sqrt(nextPrime.toDouble()).toInt()
            for (j in 2..sqrt) {
                if (nextPrime % j == 0) {
                    isPrime = false
                    break
                }
            }
            if (isPrime) {
                primes.add(nextPrime)
            }
            nextPrime += 2
        }
        return primes
    }
}