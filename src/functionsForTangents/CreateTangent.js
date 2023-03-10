import {SearchMiddleSegmentAndRadius} from "./SearchMiddleSegmentAndRadius";
import {AuxiliaryPoint} from "./AuxiliaryPoint";
import {FirstTouchPoint} from "./FirstTouchPoint";
import {SecondTouchPoint} from "./SecondTouchPoint";
import {DefiningLargerCircle} from "./DefiningLargerCircle";
import {DefinitionSmallerCircle} from "./DefinitionSmallerCircle";
import {TangentExtension} from "./TangentExtension";
import {CircleTangencyCheck} from "./CircleTangencyCheck";

export const CreateTangent = (context, circleOne, circleTwo) =>{

    const middleCircle = SearchMiddleSegmentAndRadius(circleOne, circleTwo);
    const xMiddleCircle = Number(middleCircle[0]);
    const yMiddleCircle = Number(middleCircle[1]);
    const rMiddleCircle = Number(middleCircle[2]);

    const largerCircle = DefiningLargerCircle(circleOne, circleTwo)
    const smallerCircle = DefinitionSmallerCircle(circleOne, circleTwo)

    if(!CircleTangencyCheck(circleOne, circleTwo, context, smallerCircle, largerCircle)){
        const auxiliaryPoint = AuxiliaryPoint(Number(largerCircle.xCoordinate), Number(largerCircle.yCoordinate),
            Number(largerCircle.radius) + Number(smallerCircle.radius), xMiddleCircle, yMiddleCircle, rMiddleCircle);

        const firstTouchPoint = FirstTouchPoint(largerCircle, auxiliaryPoint[0], auxiliaryPoint[1], smallerCircle)
        const secondTouchPoint = SecondTouchPoint(auxiliaryPoint[0], auxiliaryPoint[1], smallerCircle, firstTouchPoint[0], firstTouchPoint[1])

        console.log("Точки касания: ", firstTouchPoint, secondTouchPoint);

        context.beginPath()

        context.strokeStyle = 'red'

        context.lineWidth = 2;
        const b = (firstTouchPoint[1]*secondTouchPoint[0] - firstTouchPoint[0]*secondTouchPoint[1]) / (secondTouchPoint[0] - firstTouchPoint[0] + 0.0001)
        const k = (secondTouchPoint[1] - b) / (secondTouchPoint[0]+0.0001)

        let yFirstTouchPoint = k*(firstTouchPoint[0] + TangentExtension(firstTouchPoint, secondTouchPoint)[0]) + b
        let ySecondTouchPoint = k*(secondTouchPoint[0] + TangentExtension(firstTouchPoint, secondTouchPoint)[1]) + b

        context.moveTo(yFirstTouchPoint * 10, (firstTouchPoint[0] + TangentExtension(firstTouchPoint, secondTouchPoint)[0])*10)
        context.lineTo(ySecondTouchPoint*10, (secondTouchPoint[0] + TangentExtension(firstTouchPoint, secondTouchPoint)[1])*10)
        context.stroke()
    }
}