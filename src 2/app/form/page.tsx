"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function VehicleHandoverForm() {
  const { data: session, status } = useSession();

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  const [form, setForm] = useState({
    handoverDate: "",
    plateNo: "",
    vehicleType: "",
    handoverBy: "",
    takeoverBy: "",
    idNo: "",
    odoMeter: "",
    registrationCard: "no",
    vehicleAuthorization: "complete",
    remarks: "",
    contactNo: "",
  });
  const [vehiclePictures, setVehiclePictures] = useState<File[]>([]);
  const [accessoriesPictures, setAccessoriesPictures] = useState<File[]>([]);
  const [signatureHandover, setSignatureHandover] = useState<File | null>(null);
  const [signatureTakeover, setSignatureTakeover] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers for controlled inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // File input handlers
  const handleVehiclePictures = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVehiclePictures(Array.from(e.target.files).slice(0, 10));
    }
  };
  const handleAccessoriesPictures = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAccessoriesPictures(Array.from(e.target.files).slice(0, 5));
    }
  };
  const handleSignatureHandover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignatureHandover(e.target.files[0]);
    }
  };
  const handleSignatureTakeover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignatureTakeover(e.target.files[0]);
    }
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      vehiclePictures.forEach((file) => formData.append("vehiclePictures", file));
      accessoriesPictures.forEach((file) => formData.append("accessoriesPictures", file));
      if (signatureHandover) formData.append("signatureHandover", signatureHandover);
      if (signatureTakeover) formData.append("signatureTakeover", signatureTakeover);

      // Add the user ID from the session
      if (session?.user?.id) {
        formData.append("userId", session.user.id);
      }

      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Submission failed");
      }

      setSuccess(true);
      setForm({
        handoverDate: "",
        plateNo: "",
        vehicleType: "",
        handoverBy: "",
        takeoverBy: "",
        idNo: "",
        odoMeter: "",
        registrationCard: "no",
        vehicleAuthorization: "complete",
        remarks: "",
        contactNo: "",
      });
      setVehiclePictures([]);
      setAccessoriesPictures([]);
      setSignatureHandover(null);
      setSignatureTakeover(null);
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Handover Form</h1>
      <form className="handover-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="section-header">Basic Information</div>
        <div className="input-group">
          <label>Handover Date</label>
          <input type="date" name="handoverDate" value={form.handoverDate} onChange={handleChange} required />
        </div>
        
        <div className="input-group">
          <label>License Plate Number</label>
          <input type="text" name="plateNo" placeholder="1111-AAA" value={form.plateNo} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Vehicle Type</label>
          <select name="vehicleType" value={form.vehicleType} onChange={handleChange} required>
            <option value="">Select vehicle type...</option>
            <option value="BACKHOE LOADER">BACKHOE LOADER</option>
            <option value="BOOM TRUCK">BOOM TRUCK</option>
            <option value="BUS">BUS</option>
            <option value="COASTER">COASTER</option>
            <option value="DIESEL TANKER">DIESEL TANKER</option>
            <option value="DYNA IPV">DYNA IPV</option>
            <option value="DYNA TRUCK">DYNA TRUCK</option>
            <option value="FLAT BED TRAILER">FLAT BED TRAILER</option>
            <option value="FOOD TRUCK">FOOD TRUCK</option>
            <option value="FORKLIFT">FORKLIFT</option>
            <option value="MINIBUS">MINIBUS</option>
            <option value="POTABLE WT">POTABLE WT</option>
            <option value="SKID STEER LOADER">SKID STEER LOADER</option>
            <option value="SUV">SUV</option>
            <option value="TOW TRUCK">TOW TRUCK</option>
            <option value="WATER TANKER">WATER TANKER</option>
            <option value="SEDAN">SEDAN</option>
            <option value="MOBILE CRANE">MOBILE CRANE</option>
            <option value="CHAIN EXCAVATOR">CHAIN EXCAVATOR</option>
            <option value="WHEEL EXCAVATOR">WHEEL EXCAVATOR</option>
            <option value="WHEEL LOADER">WHEEL LOADER</option>
            <option value="TELEHANDLER">TELEHANDLER</option>
            <option value="LOW BED TRAILER">LOW BED TRAILER</option>
            <option value="PICKUP">PICKUP</option>
            <option value="ROLLER COMPACTOR">ROLLER COMPACTOR</option>
          </select>
        </div>

        <div className="section-header">Personnel Information</div>
        <div className="input-group">
          <label>Handover By</label>
          <input type="text" name="handoverBy" value={form.handoverBy} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Takeover By</label>
          <input type="text" name="takeoverBy" value={form.takeoverBy} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>ID Number</label>
          <input type="number" name="idNo" value={form.idNo} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Contact Number</label>
          <input type="tel" name="contactNo" value={form.contactNo} onChange={handleChange} required />
        </div>

        <div className="section-header">Vehicle Information</div>
        <div className="input-group">
          <label>ODO Meter Reading</label>
          <input type="number" name="odoMeter" value={form.odoMeter} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Registration Card</label>
          <select name="registrationCard" value={form.registrationCard} onChange={handleChange} required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="input-group">
          <label>Vehicle Authorization</label>
          <select name="vehicleAuthorization" value={form.vehicleAuthorization} onChange={handleChange} required>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div className="input-group">
          <label>Remarks</label>
          <input type="text" name="remarks" placeholder="For incomplete authorization" value={form.remarks} onChange={handleChange} />
        </div>

        <div className="section-header">Images & Signatures</div>
        <div className="upload-group">
          <label>Accessories Images (Max 10)</label>
          <div className="upload-buttons">
            <label className="upload-btn" htmlFor="accessoriesUpload">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="accessoriesUpload"
              type="file"
              name="accessoriesPictures"
              multiple
              accept="image/*"
              onChange={handleAccessoriesPictures}
              className="hidden"
            />
          </div>
        </div>

        <div className="upload-group">
          <label>Vehicle Images (Max 10)</label>
          <div className="upload-buttons">
            <label className="upload-btn" htmlFor="vehicleUpload">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="vehicleUpload"
              type="file"
              name="vehiclePictures"
              multiple
              accept="image/*"
              onChange={handleVehiclePictures}
              className="hidden"
            />
          </div>
        </div>

        <div className="upload-group">
          <label>Supervisor Signature</label>
          <div className="upload-buttons">
            <label className="upload-btn" htmlFor="supervisorSignature">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="supervisorSignature"
              type="file"
              name="signatureHandover"
              accept="image/*"
              onChange={handleSignatureHandover}
              className="hidden"
            />
          </div>
        </div>

        <div className="upload-group">
          <label>Receiver's Signature</label>
          <div className="upload-buttons">
            <label className="upload-btn" htmlFor="receiverSignature">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="receiverSignature"
              type="file"
              name="signatureTakeover"
              accept="image/*"
              onChange={handleSignatureTakeover}
              className="hidden"
            />
          </div>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="confirmInfo" required />
          <label htmlFor="confirmInfo">All the information uploaded are right.</label>
        </div>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Uploading..." : "UPLOAD"}
        </button>

        {success && <div className="success-message">Form submitted successfully!</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
