interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase{
    description: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}


interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDescription {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirement extends CoursePartDescription{
    requirements: string[];
    kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartRequirement;

export default CoursePart