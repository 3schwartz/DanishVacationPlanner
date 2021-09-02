import SepDecStrategy from './VacationPeriodStrategy/SepDecStrategy';
import AugSepStrategy from './VacationPeriodStrategy/AugSepStrategy';
import JanAugStrategy from './VacationPeriodStrategy/JanAugStrategy';
import DecJanStrategy from './VacationPeriodStrategy/DecJanStrategy';
import SepDecSpecification from '../Specifications/SepDecSpecification';
import AugSepSpecification from '../Specifications/AugSepSpecification';
import JanAugSpecification from '../Specifications/JanAugSpecification';
import DecJanSpecification from '../Specifications/DecJanSpecification';

export default class VacationPeriodFactory {

    static getVactionPeriodStrategy(startDate, endDate){
        if(SepDecSpecification.isSatisfied(startDate, endDate)) {
            return new SepDecStrategy(startDate, endDate);
        }
        if(AugSepSpecification.isSatisfied(startDate, endDate)) {
            return new AugSepStrategy(startDate, endDate);
        }
        if(JanAugSpecification.isSatisfied(startDate, endDate)) {
            return new JanAugStrategy(startDate, endDate);
        }
        if(DecJanSpecification.isSatisfied(startDate, endDate)) {
            return new DecJanStrategy(startDate, endDate);
        }
        throw new Error("Error in choosen vacation combination");
    }
}