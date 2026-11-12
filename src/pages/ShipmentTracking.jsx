
import { useState } from "react";

import {
  Search,
  Package,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  Warehouse,
  Navigation,
} from "lucide-react";

import "./ShipmentTracking.css";

function ShipmentTracking() {
  const shipments = [
    {
      id: "SHP-1001",
      customer: "John Smith",
      email: "john.smith@email.com",
      origin: "Manila, Philippines",
      destination: "Quezon City, Philippines",
      courier: "J&T Express",
      estimated: "November 13, 2026",
      status: "In Transit",
      events: [
        {
          title: "Shipment Picked Up",
          location: "Manila Warehouse",
          date: "Nov 11, 2026",
          time: "09:30 AM",
          completed: true,
        },
        {
          title: "Arrived at Sorting Facility",
          location: "Pasay Sorting Center",
          date: "Nov 11, 2026",
          time: "02:15 PM",
          completed: true,
        },
        {
          title: "In Transit to Destination",
          location: "Quezon City Hub",
          date: "Nov 12, 2026",
          time: "08:45 AM",
          completed: true,
        },
        {
          title: "Out for Delivery",
          location: "Quezon City",
          date: "Pending",
          time: "--",
          completed: false,
        },
        {
          title: "Delivered",
          location: "Customer Address",
          date: "Pending",
          time: "--",
          completed: false,
        },
      ],
    },
    {
      id: "SHP-1002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      origin: "Makati City, Philippines",
      destination: "Makati City, Philippines",
      courier: "LBC Express",
      estimated: "November 12, 2026",
      status: "Delivered",
      events: [
        {
          title: "Shipment Picked Up",
          location: "Makati Warehouse",
          date: "Nov 10, 2026",
          time: "10:00 AM",
          completed: true,
        },
        {
          title: "Arrived at Sorting Facility",
          location: "Makati Sorting Center",
          date: "Nov 10, 2026",
          time: "03:20 PM",
          completed: true,
        },
        {
          title: "In Transit to Destination",
          location: "Makati Hub",
          date: "Nov 11, 2026",
          time: "09:15 AM",
          completed: true,
        },
        {
          title: "Out for Delivery",
          location: "Makati City",
          date: "Nov 12, 2026",
          time: "08:30 AM",
          completed: true,
        },
        {
          title: "Delivered",
          location: "Customer Address",
          date: "Nov 12, 2026",
          time: "11:45 AM",
          completed: true,
        },
      ],
    },
    {
      id: "SHP-1003",
      customer: "Michael Brown",
      email: "michael.b@email.com",
      origin: "Manila, Philippines",
      destination: "Cebu City, Philippines",
      courier: "J&T Express",
      estimated: "November 15, 2026",
      status: "Pending",
      events: [
        {
          title: "Shipment Created",
          location: "Online Order System",
          date: "Nov 12, 2026",
          time: "10:15 AM",
          completed: true,
        },
        {
          title: "Shipment Picked Up",
          location: "Manila Warehouse",
          date: "Pending",
          time: "--",
          completed: false,
        },
        {
          title: "In Transit",
          location: "Destination Hub",
          date: "Pending",
          time: "--",
          completed: false,
        },
        {
          title: "Out for Delivery",
          location: "Cebu City",
          date: "Pending",
          time: "--",
          completed: false,
        },
        {
          title: "Delivered",
          location: "Customer Address",
          date: "Pending",
          time: "--",
          completed: false,
        },
      ],
    },
  ];

  const [searchId, setSearchId] = useState("SHP-1001");
  const [selectedShipment, setSelectedShipment] = useState(shipments[0]);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();

    const result = shipments.find(
      (shipment) =>
        shipment.id.toLowerCase() === searchId.trim().toLowerCase()
    );

    setSelectedShipment(result || null);
    setSearched(true);
  };

  return (
    <div className="shipment-tracking">
      <div className="tracking-heading">
        <div>
          <h2>Shipment Tracking</h2>
          <p>Track shipment locations and delivery progress.</p>
        </div>
      </div>

      <div className="tracking-search-panel">
        <div className="tracking-search-content">
          <div className="tracking-search-icon">
            <Navigation size={24} />
          </div>

          <div>
            <h3>Track Your Shipment</h3>
            <p>Enter a shipment ID to view its latest delivery status.</p>
          </div>
        </div>

        <form className="tracking-search-form" onSubmit={handleSearch}>
          <div className="tracking-input-wrapper">
            <Search size={19} />
            <input
              type="text"
              placeholder="Enter Shipment ID (e.g. SHP-1001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <button type="submit">Track Shipment</button>
        </form>

        <p className="tracking-search-hint">
          Sample IDs: SHP-1001, SHP-1002, SHP-1003
        </p>
      </div>

      {searched && selectedShipment ? (
        <>
          <div className="tracking-shipment-header">
            <div>
              <span className="tracking-label">SHIPMENT DETAILS</span>
              <h3>{selectedShipment.id}</h3>
              <p>Customer: {selectedShipment.customer}</p>
            </div>

            <span
              className={`tracking-status-badge ${selectedShipment.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {selectedShipment.status}
            </span>
          </div>

          <div className="tracking-details-grid">
            <div className="tracking-detail-card">
              <div className="tracking-detail-icon">
                <MapPin size={20} />
              </div>
              <div>
                <span>Origin</span>
                <strong>{selectedShipment.origin}</strong>
              </div>
            </div>

            <div className="tracking-detail-card">
              <div className="tracking-detail-icon">
                <Navigation size={20} />
              </div>
              <div>
                <span>Destination</span>
                <strong>{selectedShipment.destination}</strong>
              </div>
            </div>

            <div className="tracking-detail-card">
              <div className="tracking-detail-icon">
                <Truck size={20} />
              </div>
              <div>
                <span>Courier</span>
                <strong>{selectedShipment.courier}</strong>
              </div>
            </div>

            <div className="tracking-detail-card">
              <div className="tracking-detail-icon">
                <Clock size={20} />
              </div>
              <div>
                <span>Estimated Delivery</span>
                <strong>{selectedShipment.estimated}</strong>
              </div>
            </div>
          </div>

          <div className="tracking-timeline-panel">
            <div className="tracking-panel-heading">
              <div>
                <h3>Tracking History</h3>
                <p>Shipment movement and delivery updates</p>
              </div>
            </div>

            <div className="tracking-timeline">
              {selectedShipment.events.map((event, index) => (
                <div className="tracking-timeline-item" key={index}>
                  <div className="tracking-timeline-marker">
                    <div
                      className={`tracking-marker-icon ${
                        event.completed ? "completed" : "upcoming"
                      }`}
                    >
                      {event.completed ? (
                        <CheckCircle size={18} />
                      ) : (
                        <Clock size={18} />
                      )}
                    </div>

                    {index !== selectedShipment.events.length - 1 && (
                      <div
                        className={`tracking-timeline-line ${
                          event.completed ? "completed-line" : ""
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className="tracking-event-content">
                    <div className="tracking-event-title">
                      <h4>{event.title}</h4>
                      <span className={event.completed ? "event-done" : ""}>
                        {event.completed ? "Completed" : "Upcoming"}
                      </span>
                    </div>

                    <p>
                      <MapPin size={14} />
                      {event.location}
                    </p>

                    <span className="tracking-event-date">
                      {event.date} {event.time !== "--" && `• ${event.time}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tracking-customer-panel">
            <div className="tracking-customer-icon">
              <Package size={21} />
            </div>
            <div>
              <span>Shipment Recipient</span>
              <strong>{selectedShipment.customer}</strong>
              <p>{selectedShipment.email}</p>
            </div>
          </div>
        </>
      ) : searched ? (
        <div className="tracking-empty-state">
          <Package size={42} />
          <h3>Shipment Not Found</h3>
          <p>
            No shipment matches "{searchId}". Please check the shipment ID
            and try again.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default ShipmentTracking;
