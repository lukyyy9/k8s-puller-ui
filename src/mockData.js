export const MOCK_DASHBOARD_DATA = {
  "totalElements": 245,
  "totalPages": 13,
  "currentPage": 0,
  "services": [
    {
      "serviceName": "payment-gateway",
      "clusterName": "k8s-prod-eu-west-1",
      "namespaceName": "production-finance",
      "image": "payment-gateway:v1.4.2",
      "serviceMaxCvssScore": 9.8
    },
    {
      "serviceName": "user-auth-service",
      "clusterName": "k8s-staging-global",
      "namespaceName": "staging-iam",
      "image": "user-auth-service:v2.0.1",
      "serviceMaxCvssScore": 4.3
    },
    {
      "serviceName": "front-store",
      "clusterName": "k8s-prod-eu-west-1",
      "namespaceName": "production-store",
      "image": "front-store-ui:v3.1.0",
      "serviceMaxCvssScore": 0.0
    }
  ]
};

export const getMockServiceDetails = (id) => ({
  "serviceId": "uuid-1234",
  "serviceName": id || "payment-gateway",
  "clusterName": "k8s-prod-eu-west-1",
  "namespaceName": "production-finance",
  "image": "registry.mycompany.local/fintech/payment-gateway:v1.4.2",
  "serviceMaxCvssScore": 9.8,
  "vulnerabilityCounts": {
    "critical": 1,
    "high": 3,
    "medium": 12
  },
  "dependencies": [
    {
      "name": "org.apache.logging.log4j:log4j-core",
      "version": "2.14.1",
      "packageType": "maven",
      "maxCvssScore": 9.8,
      "cves": ["CVE-2021-44228", "CVE-2021-45046"]
    },
    {
      "name": "openssl",
      "version": "1.1.1f-1ubuntu2",
      "packageType": "deb",
      "maxCvssScore": 7.5,
      "cves": ["CVE-2022-0778"]
    },
    {
      "name": "com.fasterxml.jackson.core:jackson-databind",
      "version": "2.12.3",
      "packageType": "maven",
      "maxCvssScore": 0.0,
      "cves": []
    }
  ]
});

