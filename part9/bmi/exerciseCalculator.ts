interface args {
  exerciseHours: number[];
  target: number;
}

interface resultType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): args => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const newArgs = args.slice(2);

  if (newArgs.map((val) => !isNaN(Number(val)))) {
    const numericArray = newArgs.map((val) => Number(val));
    return {
      exerciseHours: numericArray.slice(0, numericArray.length - 1),
      target: numericArray[numericArray.length - 1],
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): resultType => {
  const sum = exerciseHours.reduce((a, b) => {
    return a + b;
  }, 0);

  const periodLength = exerciseHours.length;
  const average = sum / periodLength;

  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;

  let rating: number;
  let ratingDescription: string;
  let success: boolean;
  if (average < target) {
    rating = 3;
    ratingDescription = "poor";
    success = false;
  } else if (average == target) {
    rating = 2;
    ratingDescription = "good";
    success = true;
  } else if (average > target) {
    rating = 3;
    ratingDescription = "best";
    success = true;
  }

  const result: resultType = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

try {
  const { exerciseHours, target } = parseArguments(process.argv);
  console.log(exerciseHours, target);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
