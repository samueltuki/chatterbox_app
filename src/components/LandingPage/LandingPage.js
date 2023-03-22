import React from 'react';
import "~bootstrap/scss/bootstrap";
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="container parent-container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-body">
              <h4 className="d-flex justify-content-center">Welcome to ChatterBox</h4>
              <div className="d-flex justify-content-center ml-3">
                <button type="submit" className="btn btn-primary">SIGN IN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

