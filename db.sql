DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS student_classes;
DROP TABLE IF EXISTS grades;

CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY, 
    firstname TEXT, 
    lastname TEXT, 
    dob TEXT, 
    gender TEXT, 
    address_street_1 TEXT, 
    address_street_2 TEXT, 
    address_city TEXT, 
    address_state TEXT, 
    address_zip TEXT,
    email TEXT,
    phone TEXT
);

CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY, 
    firstname TEXT, 
    lastname TEXT, 
    dob TEXT, 
    gender TEXT, 
    address_street_1 TEXT, 
    address_street_2 TEXT, 
    address_city TEXT, 
    address_state TEXT, 
    address_zip TEXT,
    email TEXT,
    phone TEXT,
    salary TEXT,
    bio TEXT,
    hire_date TEXT,
    teacher_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY, 
    title TEXT,
    description TEXT, 
    time TEXT,
    duration TEXT,
    teacher_id TEXT,
    class_id TEXT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id)
);

CREATE TABLE IF NOT EXISTS student_classes (
    student_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY,
    student_id TEXT NOT NULL,
    class_id TEXT NOT NULL,
    grade FLOAT CHECK(grade >= 0 AND grade <= 100),
    FOREIGN KEY (student_id) REFERENCES students (student_id),
    FOREIGN KEY (class_id) REFERENCES classes (class_id)
);
