def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_readiness_check(client):
    response = client.get("/ready")
    assert response.status_code == 200
    assert response.json() == {"status": "ready", "database": "connected"}

def test_version(client):
    response = client.get("/api/v1/version")
    assert response.status_code == 200
    assert "version" in response.json()

def test_create_incident(client):
    payload = {
        "title": "Database Down",
        "description": "Main DB is not responding",
        "priority": "CRITICAL",
        "category": "DATABASE"
    }
    response = client.post("/api/v1/incidents", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Database Down"
    assert data["priority"] == "CRITICAL"
    assert data["status"] == "OPEN"
    assert "id" in data

def test_get_incidents(client):
    response = client.get("/api/v1/incidents")
    assert response.status_code == 200
    data = response.json()
    assert type(data) == list

def test_update_incident_status(client):
    # First create one
    payload = {
        "title": "Network Lag",
        "description": "High latency on VPN",
        "priority": "HIGH",
        "category": "NETWORK"
    }
    create_response = client.post("/api/v1/incidents", json=payload)
    incident_id = create_response.json()["id"]

    # Update status
    update_response = client.patch(f"/api/v1/incidents/{incident_id}/status", json={"status": "IN_PROGRESS"})
    assert update_response.status_code == 200
    assert update_response.json()["status"] == "IN_PROGRESS"

def test_dashboard_stats(client):
    response = client.get("/api/v1/dashboard/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_incidents" in data
    assert "open" in data
