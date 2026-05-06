export const MOCK_DASHBOARD_DATA = {
  "totalElements": 245,
  "totalPages": 13,
  "currentPage": 0,
  "nodes": [
    {
      "id": "k8s-prod-eu-west-1:production-finance:payment-gateway",
      "label": "payment-gateway",
      "type": "SERVICE",
      "namespace": "production-finance",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "High",
        "image": "payment-gateway:v1.4.2",
        "serviceMaxCvssScore": 9.8
      }
    },
    {
      "id": "k8s-staging-global:staging-iam:user-auth-service",
      "label": "user-auth-service",
      "type": "SERVICE",
      "namespace": "staging-iam",
      "cluster": "k8s-staging-global",
      "metadata": {
        "highestVulnerability": "Medium",
        "image": "user-auth-service:v2.0.1",
        "serviceMaxCvssScore": 4.3
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-store:front-store",
      "label": "front-store",
      "type": "SERVICE",
      "namespace": "production-store",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "Low",
        "image": "front-store-ui:v3.1.0",
        "serviceMaxCvssScore": 0.0
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-store:inventory-service",
      "label": "inventory-service",
      "type": "SERVICE",
      "namespace": "production-store",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "Low",
        "image": "inventory-service:v1.2.0",
        "serviceMaxCvssScore": 2.1
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-logistics:shipping-service",
      "label": "shipping-service",
      "type": "SERVICE",
      "namespace": "production-logistics",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "Medium",
        "image": "shipping-service:v2.5.1",
        "serviceMaxCvssScore": 5.5
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-core:notification-service",
      "label": "notification-service",
      "type": "SERVICE",
      "namespace": "production-core",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "Critical",
        "image": "notification-service:v4.0.0",
        "serviceMaxCvssScore": 9.2
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-ai:recommendation-engine",
      "label": "recommendation-engine",
      "type": "SERVICE",
      "namespace": "production-ai",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "None",
        "image": "recommendation-engine:v1.0.3",
        "serviceMaxCvssScore": 0.0
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-store:search-service",
      "label": "search-service",
      "type": "SERVICE",
      "namespace": "production-store",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "Low",
        "image": "search-service:v1.1.2",
        "serviceMaxCvssScore": 1.5
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-data:analytics-worker",
      "label": "analytics-worker",
      "type": "SERVICE",
      "namespace": "production-data",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "High",
        "image": "analytics-worker:v3.2.1",
        "serviceMaxCvssScore": 7.8
      }
    },
    {
      "id": "k8s-prod-eu-west-1:production-support:customer-support-api",
      "label": "customer-support-api",
      "type": "SERVICE",
      "namespace": "production-support",
      "cluster": "k8s-prod-eu-west-1",
      "metadata": {
        "highestVulnerability": "Medium",
        "image": "customer-support-api:v1.0.0",
        "serviceMaxCvssScore": 4.1
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "k8s-prod-eu-west-1:production-store:front-store",
      "target": "k8s-prod-eu-west-1:production-finance:payment-gateway",
      "protocol": "HTTP",
      "port": 443,
      "verdict": "FORWARDED",
      "metrics": {
        "callCount": 1450
      }
    },
    {
      "id": "edge-2",
      "source": "k8s-staging-global:staging-iam:user-auth-service",
      "target": "k8s-prod-eu-west-1:production-finance:payment-gateway",
      "protocol": "HTTP",
      "port": 8080,
      "verdict": "DROPPED",
      "metrics": {
        "callCount": 12
      }
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
    }
  ]
});
