import React, { useState, useEffect } from "react";
import Title from "components/Title";
import Container from "components/Container";
import CreateNew from "components/CreateNew";
import CourseCard from "components/CourseCard";
import axios from "axios";
import Pagination from "components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IData, IEditCourse, ICourse } from "shared/interface";
import CourseWrapper from "components/CourseWrapper";
import { useLocation } from "react-router-dom";

const baseUrl = "http://localhost:5000/";
const defaultLimit = 4;

function useQueryParams() {
  const { search } = useLocation();

  return new URLSearchParams(search);
}

function Courses() {
  const params = useQueryParams();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(params.get("page") || "1")
  );
  const [limit, setLimit] = useState(
    parseInt(params.get("perpage") || defaultLimit.toString())
  );

  const {
    isLoading,
    data: courses,
    refetch,
  } = useQuery(["coursesData"], () =>
    axios
      .get<IData>(baseUrl + "courses", {
        params: { page: currentPage, limit: limit },
      })
      .then((response) => {
        setPageCount(response.data.pageCount);

        return response.data.results;
      })
  );

  useEffect(() => {
    refetch();
  }, [currentPage, limit]);

  const handleLimitChange = (newLimit: number) => {
    setCurrentPage(() => 1);
    setLimit(newLimit);
  };

  const goToPrevPage = () => {
    console.log(courses?.length);
    if (currentPage !== 1 && courses?.length === 1)
      setCurrentPage((prev) => prev - 1);
  };

  const { mutate: deleteCourse } = useMutation<ICourse, Error, IEditCourse>(
    ({ index }) =>
      axios.post(
        `${baseUrl}delete/${index ? index + limit * (currentPage - 1) : -1}`,
        {
          crossdomain: true,
        }
      ),
    {
      onSuccess: () => {
        refetch();
        goToPrevPage();
      },
    }
  );

  const { mutate: createCourse } = useMutation<ICourse, Error, ICourse>(
    ({ name, description, instructor }) =>
      axios.post(`${baseUrl}create`, {
        crossdomain: true,
        params: { name, description, instructor },
      }),
    {
      onSuccess: () => refetch(),
    }
  );

  const { mutate: editCourse } = useMutation<ICourse, Error, ICourse>(
    ({ index, name, description, instructor }) =>
      axios.post(
        `${baseUrl}update/${index ? index + limit * (currentPage - 1) : -1}`,
        {
          crossdomain: true,
          params: { name, description, instructor },
        }
      ),
    {
      onSuccess: () => refetch(),
    }
  );

  return (
    <>
      <Title name="Online courses" />
      <Container>
        <CreateNew onCreate={createCourse} />
        <CourseWrapper>
          {!isLoading &&
            courses &&
            courses.map(
              (
                course: {
                  name: string;
                  description: string;
                  instructor: string;
                },
                i: number
              ) => (
                <CourseCard
                  key={i}
                  index={i}
                  name={course.name}
                  desc={course.description}
                  instructor={course.instructor}
                  onEdit={editCourse}
                  onDelete={() => deleteCourse({ index: i })}
                />
              )
            )}
        </CourseWrapper>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          limit={limit}
          setPage={setCurrentPage}
          setLimit={handleLimitChange}
        />
      </Container>
    </>
  );
}

export default Courses;
