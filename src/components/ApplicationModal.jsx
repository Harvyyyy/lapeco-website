import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import StepIndicator from './StepIndicator';
import './ApplicationModal.css';
import lapecoLogo from '../assets/images/logo.png';
const TOTAL_STEPS = 4;
function ApplicationModal({ show, onHide }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', email: '', phone: '',
    birthday: '', gender: '', photo: null, applyingFor: '', resume: null,
    sss: '', tin: '', pagibig: '', philhealth: ''
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  const handleFileChange = (e) => {
    setFormData(prevState => ({ ...prevState, resume: e.target.files[0] }));
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prevState => ({ ...prevState, photo: file }));
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  const resetForm = () => {
    setFormData({
      firstName: '', middleName: '', lastName: '', email: '', phone: '',
      birthday: '', gender: '', photo: null, applyingFor: '', resume: null,
      sss: '', tin: '', pagibig: '', philhealth: ''
    });
    setValidated(false);
    setCurrentStep(1);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    document.getElementById('multiStepForm')?.reset();
  };
  const handleAttemptClose = () => {
    setShowExitConfirmModal(true);
  };
  const handleFinalClose = () => {
    setShowExitConfirmModal(false);
    resetForm();
    onHide();
  };
  const handleNextStep = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(false);
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleAttemptSubmit = () => {
    setShowConfirmModal(true);
  };
  const handleFinalSubmit = () => {
    setShowConfirmModal(false);
    console.log('Final Form Submitted:', formData);
    toast.success('Application submitted successfully! Thank you.');
    handleFinalClose();
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Row className="mb-3">
              <Form.Group as={Col} md={4} controlId="validationFirstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please provide your first name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={3} controlId="validationMiddleName">
                <Form.Label>Middle</Form.Label>
                <Form.Control type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md={5} controlId="validationLastName">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please provide your last name.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={7} controlId="validationEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" required />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={5} controlId="validationPhone">
                <Form.Label>Phone*</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., 09123456789" required />
                <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4 align-items-center">
              <Form.Group as={Col} sm={8} controlId="validationPhoto">
                <Form.Label>Applicant Photo (Optional)</Form.Label>
                <Form.Control type="file" name="photo" onChange={handlePhotoChange} accept="image/png, image/jpeg, image/jpg" />
              </Form.Group>
              {photoPreview && (
                <Col sm={4} className="text-center mt-3 mt-sm-0">
                  <Image src={photoPreview} alt="Applicant preview" className="applicant-photo-preview" />
                </Col>
              )}
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md={6} controlId="validationBirthday">
                <Form.Label>Birthday*</Form.Label>
                <Form.Control type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please enter your birthday.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="validationGender">
                <Form.Label>Gender*</Form.Label>
                <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select your gender.</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </>
        );
      case 2:
        return (
          <>
            <Row className="mb-4">
              <Form.Group as={Col} md={6} controlId="validationApplyingFor">
                <Form.Label>Applying For*</Form.Label>
                <Form.Select name="applyingFor" value={formData.applyingFor} onChange={handleChange} required>
                  <option value="">Select a job...</option>
                  <option value="HR Personnel">HR Personnel</option>
                  <option value="Packer">Packer</option>
                  <option value="Lifter">Lifter</option>
                  <option value="Picker">Picker</option>
                  <option value="Mover">Mover</option>
                  <option value="Utility Staff">Utility Staff</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a job position.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="validationResume">
                <Form.Label>Resume (PDF/Doc)*</Form.Label>
                <Form.Control type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
                <Form.Control.Feedback type="invalid">Please upload your resume.</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </>
        );
      case 3:
        return (
          <>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="validationSSS">
                <Form.Label>SSS No.</Form.Label>
                <Form.Control type="text" name="sss" value={formData.sss} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="validationTIN">
                <Form.Label>TIN No.</Form.Label>
                <Form.Control type="text" name="tin" value={formData.tin} onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md={6} controlId="validationPagibig">
                <Form.Label>Pag-IBIG No.</Form.Label>
                <Form.Control type="text" name="pagibig" value={formData.pagibig} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="validationPhilhealth">
                <Form.Label>PhilHealth No.</Form.Label>
                <Form.Control type="text" name="philhealth" value={formData.philhealth} onChange={handleChange} />
              </Form.Group>
            </Row>
          </>
        );
      case 4:
        return (
          <>
            <p className="mb-4">Please review your information carefully before submitting.</p>
            <div className="review-summary">
              {Object.entries(formData).map(([key, value]) => {
                if (!value) return null;
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="review-item">
                    <strong>{formattedKey}:</strong>
                    <span>{typeof value === 'object' ? value.name : value}</span>
                  </div>
                );
              })}
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleAttemptClose} dialogClassName="modal-90w" centered backdrop="static" keyboard={false}>
        <Modal.Body className="p-0">
          <div className="application-modal-layout">
            <div className="modal-sidebar">
              <img src={lapecoLogo} alt="LAPECO" className="modal-logo" />
              <StepIndicator currentStep={currentStep} />
            </div>
            <div className="modal-main-content">
              <div className="modal-form-header">
                <h3 className="modal-form-title">
                  {currentStep === 1 && 'Personal Information'}
                  {currentStep === 2 && 'Application Details'}
                  {currentStep === 3 && 'Government Requirements'}
                  {currentStep === 4 && 'Review Your Application'}
                </h3>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleAttemptClose}></button>
              </div>
              <Form noValidate validated={validated} onSubmit={handleNextStep} id="multiStepForm">
                <div className="form-content-area">
                  {renderStepContent()}
                </div>
                <div className="modal-navigation">
                  {currentStep > 1 && (
                    <Button variant="secondary" onClick={handlePrevStep}>
                      Previous
                    </Button>
                  )}
                  <div className="ms-auto">
                    {currentStep < TOTAL_STEPS && (
                      <Button variant="success" type="submit">
                        Next Step
                      </Button>
                    )}
                    {currentStep === TOTAL_STEPS && (
                      <Button variant="success" onClick={handleAttemptSubmit}>
                        Submit Application
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit your application? Please ensure all information is correct.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleFinalSubmit}>
            Yes, Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showExitConfirmModal} onHide={() => setShowExitConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Exit Application?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to exit? All your progress will be lost.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExitConfirmModal(false)}>
            Stay
          </Button>
          <Button variant="danger" onClick={handleFinalClose}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ApplicationModal;
