import {MusicSystem} from "../MusicSystem";
import {GraphicalMusicPage} from "../GraphicalMusicPage";
import {SystemLinesEnum} from "../SystemLinesEnum";
import {SystemLinePosition} from "../SystemLinePosition";
import {StaffMeasure} from "../StaffMeasure";
import {SystemLine} from "../SystemLine";
import {VexFlowStaffLine} from "./VexFlowStaffLine";
import {VexFlowMeasure} from "./VexFlowMeasure";
import {VexFlowConverter} from "./VexFlowConverter";
import {StaffLine} from "../StaffLine";
import {EngravingRules} from "../EngravingRules";
import { VexFlowInstrumentBracket } from "./VexFlowInstrumentBracket";

export class VexFlowMusicSystem extends MusicSystem {
    constructor(parent: GraphicalMusicPage, id: number) {
        super(parent, id);

    }

    public calculateBorders(rules: EngravingRules): void {
        if (this.staffLines.length === 0) {
            return;
        }
        let width: number = this.calcBracketsWidth();
        this.boundingBox.BorderLeft = -width;
        this.boundingBox.BorderMarginLeft = -width;
        this.boundingBox.XBordersHaveBeenSet = true;
    }

    /**
     * This method creates all the graphical lines and dots needed to render a system line (e.g. bold-thin-dots..).
     * @param xPosition
     * @param lineWidth
     * @param lineType
     * @param linePosition indicates if the line belongs to start or end of measure
     * @param musicSystem
     * @param topMeasure
     * @param bottomMeasure
     */
    protected createSystemLine(xPosition: number, lineWidth: number, lineType: SystemLinesEnum, linePosition: SystemLinePosition,
                               musicSystem: MusicSystem, topMeasure: StaffMeasure, bottomMeasure: StaffMeasure = undefined): SystemLine {
        // ToDo: create line in Vexflow
        if (bottomMeasure) {
            (bottomMeasure as VexFlowMeasure).lineTo(topMeasure as VexFlowMeasure, VexFlowConverter.line(lineType));
        }
        return new SystemLine(lineType, linePosition, this, topMeasure, bottomMeasure);
    }

    /**
     * creates an instrument brace for the given dimension.
     * The height and positioning can be inferred from the given staff lines.
     * @param firstStaffLine the upper StaffLine (use a cast to get the VexFlowStaffLine) of the brace to create
     * @param lastStaffLine the lower StaffLine (use a cast to get the VexFlowStaffLine) of the brace to create
     */
    protected createInstrumentBracket(firstStaffLine: StaffLine, lastStaffLine: StaffLine): void {
        // You could write this in one line but the linter doesn't let me.
        const firstVexStaff: VexFlowStaffLine = (firstStaffLine as VexFlowStaffLine);
        const lastVexStaff: VexFlowStaffLine = (lastStaffLine as VexFlowStaffLine);
        const vexFlowBracket: VexFlowInstrumentBracket = new VexFlowInstrumentBracket(firstVexStaff, lastVexStaff);
        this.InstrumentBrackets.push(vexFlowBracket);
        return;
    }

    /**
     * creates an instrument group bracket for the given dimension.
     * There can be cascaded bracket (e.g. a group of 2 in a group of 4) -
     * The recursion depth informs about the current depth level (needed for positioning)
     * @param firstStaffLine the upper staff line of the bracket to create
     * @param lastStaffLine the lower staff line of the bracket to create
     * @param staffHeight
     * @param recursionDepth
     */
    protected createGroupBracket(firstStaffLine: StaffLine, lastStaffLine: StaffLine, recursionDepth: number): void {
        return;
    }
}
