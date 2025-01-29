interface ExerciseResult {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
  }
  
  const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((hours) => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = "good job, target achieved";
    } else if (average >= target * 0.5) {
      rating = 2;
      ratingDescription = "not too bad but could be better";
    } else {
      rating = 1;
      ratingDescription = "you need to exercise more";
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };

  const target: number = Number(process.argv[2]);
  const dailyHours: number[] = process.argv.slice(3).map(Number);

  console.log(calculateExercises(dailyHours, target));

export { calculateExercises };