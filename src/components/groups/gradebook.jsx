import Head from 'next/head';
import { StandardNav } from '@/components/StandardNav';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import StudentGradeCard from '@/components/StudentGradeCard';

import { useRouter } from 'next/router';

const Gradebook = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [classroomId, setClassroomId] = useState(-1);

  const getStudentsSubmissionsFinalGrades = async (classroomId) => {
    try {
      const url =
        baseUrl +
        '/submission/getStudentsSubmissionsFinalGrades/' +
        classroomId;
      var requestOptions = {
        method: 'GET',
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setStudents(data.body);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const params = window.location.href.split('/');
    const classCode = params[4];

    const getAssignments = async () => {
      try {
        var requestOptions = {
          method: 'GET',
        };
        console.log(classCode);
        const response = await fetch(
          `${baseUrl}/classroom/classroom-by-classcode?classCode=${classCode}`,
          requestOptions
        );
        const data = await response.json();
        if (data.success) {
          setAssignments(data.body.assignments);
          setClassroomId(data.body.id);
          await getStudentsSubmissionsFinalGrades(data.body.id);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (classCode) {
      getAssignments();
    }
  }, []);
  let collumSize = assignments.length + 1;

  console.log(assignments);
  // console.log(students);
  // each student object has an array of submissions and each submission is linked to a class
  return (
    <>
      <Head>
        <title>Gradebook - CTFGuide</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
        </style>
      </Head>
      <StandardNav />

      <button
        onClick={() => (window.location.href = ``)}
        className="ml-4 rounded-lg bg-blue-600 px-2 py-1 text-white hover:bg-blue-600/50"
        style={{
          fontSize: '15px',
          marginLeft: '100px',
        }}
      >
        <i className="fa fa-arrow-left" style={{ color: 'white' }}></i> Back
      </button>
      <div
        className="mt-4 grid grid-cols-6 gap-x-4"
        style={{ backgroundColor: '#333', color: '#fff', margin: '100px' }}
      >
        <div className="col-span-4 rounded-lg bg-neutral-800/50 px-4 py-3 ">
          <div
            className={`mt-4 grid grid-cols-${assignments.length + 2} gap-x-4`}
            style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}
          >
            <div>Student</div>
            {assignments.map((assignment) => (
              <div key={assignment.id}>{assignment.name}</div>
            ))}
            <div>Final Grade</div>
          </div>

          <div style={{ overflow: 'auto', minHeight: '500px' }}>
            {students.map((student, index) => (
              <div
                key={index}
                className={`grid grid-cols-${assignments.length + 2} gap-x-4`}
                style={{
                  backgroundColor: '#444',
                  marginTop: '10px',
                  padding: '10px',
                }}
              >
                <div style={{ color: 'white' }}>{student.name}</div>
                {assignments.map((assignment) => (
                  <div style={{ color: 'white' }}>
                    {student[assignment.name] || 'NA'}/100
                  </div>
                ))}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>{student.finalGrade}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/*
        {classroomId !== -1 &&
          students.map((student, idx) => {
            return (
              <div key={idx}>
                {' '}
                <StudentGradeCard
                  student={student}
                  classroomId={classroomId}
                />{' '}
              </div>
            );
          })}
*/
export default Gradebook;
