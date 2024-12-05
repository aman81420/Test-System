import { useNavigate } from 'react-router-dom'; // Import useNavigate
import subjectImage from '../assets/subject.png'; // Adjust the path based on the actual location

const MainSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const questionCategories = [
    { title: 'DSA Questions', description: 'Must do for interview prep', link: '/Quiz-Page', image: subjectImage },
    { title: 'JavaScript Questions', description: 'Must do for interview prep', link: '/Quiz-Page', image: subjectImage },
    { title: 'Computer Network Questions', description: 'Must do for interview prep', link: '/Quiz-Page', image: subjectImage },
    { title: 'DBMS Questions', description: 'Must do for interview prep', link: '/Quiz-Page', image: subjectImage },
    { title: 'OOPS Questions', description: 'Must do for interview prep', link: '/Quiz-Page', image: subjectImage },
    { title: 'WIT Questions', description: 'Must do for interview prep', link: '/Quiz-Page', image: subjectImage },
  ];

  return (
    <section className="bg-[#111111f4] min-h-screen p-6">
      <p className="text-white text-3xl mt-10 mb-6 text-center font-normal">Practice Questions</p>
      <main className="flex flex-wrap justify-center gap-6">
        {questionCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(category.link)} // Use navigate for redirection
            className="w-[28rem] m-5 hover:cursor-pointer hover:bg-[#353434] bg-[#282727df] rounded-lg flex items-center transition-transform transform hover:scale-105 shadow-md"
          >
            <img
              className="h-24 m-5 rounded-lg border-none border-2"
              src={category.image}
              alt={`${category.title}`}
            />
            <div>
              <p className="text-white text-xl ">{category.title}</p>
              <p className="text-[#958e8ef9] ">{category.description}</p>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default MainSection;
