import { Button, Col, Form, Row } from "react-bootstrap";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants/api";

const TodesPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [todes, setTodes] = useState(null);
  const [isDone, setIsDone] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setInputValue(event.target[0].value);

    event.currentTarget.reset();
  };

  const handleSelect = (event) => {
    console.log(event.target.value);
  };

  const handleCheck = (id) => {};

  const handleTrash = (event) => {
    const row = event.currentTarget.closest(".row");
    row.remove();
  };

  useEffect(() => {
    fetch(API_ENDPOINTS.todos)
      .then((response) => response.json())
      .then((data) => {
        setTodes(data);
        setIsDone(data.completed);

        console.log(isDone);
      });
  });

  return (
    <>
      <PageTitle>Create ToDo:</PageTitle>

      <Form onSubmit={handleSubmit} className="col-md-6">
        <Form.Group className="row gap-3 mb-3">
          <Col xs="8">
            <Form.Control
              name="title"
              type="text"
              className="px-2 py-2 border-secondary-subtle rounded shadow-sm "
              required
              placeholder="ToDo Title"
            />
          </Col>

          <Col xs="auto">
            <Button
              type="submit"
              variant="primary"
              className="py-2 px-3 w-100 rounded"
            >
              create
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <hr className="my-5" />

      <div className="col-md-2 mb-4">
        <Form.Select
          onChange={handleSelect}
          className="shadow-sm px-3 py-2"
          aria-label="Default select example"
        >
          <option value="all">all</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Form.Select>
      </div>

      {todes && (
        <div className="cards-grid">
          {todes.map((tode) => (
            <Row
              key={tode.id}
              className={`justify-content-between align-self-center border border-secondary-subtle rounded py-2 px-3 shadow-sm ${
                isDone[tode.id] ? "" : "bg-secondary-subtle"
              }`}
            >
              <Col xs="auto">
                <p
                  className={`user-select-none ${
                    isDone[tode.id] ? "" : "text-decoration-line-through"
                  }`}
                >
                  {tode.id}
                </p>
              </Col>

              <Col xs="auto">
                <i
                  onClick={() => handleCheck(tode.id)}
                  className={`bi fs-5 me-3 ${isDone[tode.id] ? "bi-check2" : "bi-check2-all"}`}
                  role="button"
                />
                <i
                  onClick={handleTrash}
                  className="bi bi-trash-fill fs-5"
                  role="button"
                />
              </Col>
            </Row>
          ))}
        </div>
      )}
    </>
  );
};

export default TodesPage;
