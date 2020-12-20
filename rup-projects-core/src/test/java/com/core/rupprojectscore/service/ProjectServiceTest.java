package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class ProjectServiceTest {

    private ProjectService projectService;
    private ProjectDto trainedProjectDto;
    private ProjectDto createdProjectDto;
    private ProjectRepository projectRepository = mock(ProjectRepository.class);

    @BeforeEach
    public void before() {
        projectService = new ProjectServiceImpl( projectRepository);
    }

    @Test
    void planProjectTest_having_defaultNumberOfIterations() {
        trainedProjectDto = createProjectDto(LocalDate.of(1, 1, 1), LocalDate.of(1, 6, 30), cost(100000L));

        createdProjectDto = projectService.planProject(trainedProjectDto);

        verify(projectRepository, times(1)).save(any());
        assertProject(PhaseType.values(), iterations(10));
        assertPhases(
                List.of(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 19)),
                List.of(3, LocalDate.of(1, 1, 20), LocalDate.of(1, 3, 17)),
                List.of(5, LocalDate.of(1, 3, 18), LocalDate.of(1, 6, 20)),
                List.of(1, LocalDate.of(1, 6, 21), LocalDate.of(1, 6, 30))
        );
        assertIterations(
//                getInterval(LocalDate.of(1, 1, 1),10, 20), TODO getInterval method to created the whole list
                List.of(LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 19)),
                List.of(LocalDate.of(1, 1, 20), LocalDate.of(1, 2, 7)),
                List.of(LocalDate.of(1, 2, 8), LocalDate.of(1, 2, 26)),
                List.of(LocalDate.of(1, 2, 27), LocalDate.of(1, 3, 17)),
                List.of(LocalDate.of(1, 3, 18), LocalDate.of(1, 4, 5)),
                List.of(LocalDate.of(1, 4, 6), LocalDate.of(1, 4, 24)),
                List.of(LocalDate.of(1, 4, 25), LocalDate.of(1, 5, 13)),
                List.of(LocalDate.of(1, 5, 14), LocalDate.of(1, 6, 1)),
                List.of(LocalDate.of(1, 6, 2), LocalDate.of(1, 6, 20)),
                List.of(LocalDate.of(1, 6, 21), LocalDate.of(1, 6, 30))
        );
    }

    private List<List<LocalDate>> getInterval(LocalDate localDate, int shift, int times) {
        List<List<LocalDate>> result = new ArrayList<>();
        for (int index = 0; index < times; index++) {
            LocalDate startDate = localDate.plusDays(index * shift);
            result.add(List.of(startDate, startDate.plusDays(shift)));
        }
        return result;
    }

    @Test
    void planProjectTest_having_20NumberIterations_and_id_then_itCreates20IterationsAndRemovePrevious() {
        trainedProjectDto = createProjectDto(LocalDate.of(1, 1, 1), LocalDate.of(1, 9, 25), cost(100000L));
        trainedProjectDto.setNumberOfIterations(20L);
        trainedProjectDto.setId(5L);

        createdProjectDto = projectService.planProject(trainedProjectDto);

        verify(projectRepository, times(1)).save(any());
        assertProject(PhaseType.values(), iterations(20));
        assertPhases(
                List.of(2, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 28)),
                List.of(6, LocalDate.of(1, 1, 29), LocalDate.of(1, 4, 22)),
                List.of(10, LocalDate.of(1, 4, 23), LocalDate.of(1, 9, 9)),
                List.of(2, LocalDate.of(1, 9, 10), LocalDate.of(1, 9, 25))
        );
    }

    private ProjectDto createProjectDto(LocalDate startDate, LocalDate endDate, long cost) {
        return ProjectDto.builder()
                .startDate(startDate)
                .endDate(endDate)
                .cost(cost)
                .build();
    }

    public void assertProject(PhaseType[] phaseTypes, int iterations) {
        assertThat(createdProjectDto.getPhases().size()).isEqualTo(phaseTypes.length);
        assertThat(createdProjectDto.getIterations().size()).isEqualTo(iterations);
    }

    private void assertPhases(List<? extends Serializable>... expectedPhases) {
        for (PhaseType phaseType : PhaseType.values()) {
            assertPhase(createdProjectDto, phaseType, expectedPhases[phaseType.ordinal()]);
        }
    }

    private void assertPhase(ProjectDto projectDto, PhaseType phaseType, List<? extends Serializable> expectedPhaseInformation) {
        PhaseDto phase = getPhase(projectDto, phaseType);
        assertThat(phase.getIterations().size()).isEqualTo((int) expectedPhaseInformation.get(0));
        assertThat(phase.getStartDate()).isEqualTo(expectedPhaseInformation.get(1));
        assertThat(phase.getEndDate()).isEqualTo(expectedPhaseInformation.get(2));
    }

    private PhaseDto getPhase(ProjectDto projectDto, PhaseType phaseType) {
        return projectDto.getPhases().stream()
                .filter(phaseDto -> phaseType.equals(phaseDto.getType()))
                .findFirst()
                .orElse(null);
    }

    private void assertIterations(List<? extends Serializable>... expectedIterations) {
        for (IterationDto iteration : createdProjectDto.getIterations()) {
            assertIteration(iteration, expectedIterations);
        }
    }

    private void assertIteration(IterationDto iteration, List<? extends Serializable>[] expectedIterationInfo) {
        assertThat(Arrays.asList(iteration.getStartDate(), iteration.getEndDate())).isIn(expectedIterationInfo);
    }

    private long cost(long cost) {
        return cost;
    }

    private int iterations(int iterations) {
        return iterations;
    }

}
