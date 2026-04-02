import React from 'react';
import { useNavigate } from 'react-router';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAssessment, TargetSymptom } from '../context/AssessmentContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, GripVertical, X, Plus } from 'lucide-react';

const ItemTypes = {
  TARGET_SYMPTOM: 'target_symptom',
};

interface DraggableTargetCardProps {
  symptom: TargetSymptom;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onRemove: () => void;
}

function DraggableTargetCard({ symptom, index, moveCard, onRemove }: DraggableTargetCardProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.TARGET_SYMPTOM,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TARGET_SYMPTOM,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`flex items-center gap-3 p-3 border border-border rounded-lg bg-card ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div ref={drag} className="cursor-move">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
        {symptom.rank}
      </div>
      <span className="flex-1 text-sm text-foreground">{symptom.label}</span>
      <button
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function TargetSymptomsContent() {
  const navigate = useNavigate();
  const {
    selectedObsessions,
    selectedCompulsions,
    selectedAvoidance,
    targetObsessions,
    setTargetObsessions,
    targetCompulsions,
    setTargetCompulsions,
    targetAvoidance,
    setTargetAvoidance,
  } = useAssessment();

  const addTargetObsession = (label: string, id: string) => {
    if (targetObsessions.length < 3 && !targetObsessions.find(t => t.id === id)) {
      setTargetObsessions([
        ...targetObsessions,
        { id, label, rank: targetObsessions.length + 1 },
      ]);
    }
  };

  const addTargetCompulsion = (label: string, id: string) => {
    if (targetCompulsions.length < 3 && !targetCompulsions.find(t => t.id === id)) {
      setTargetCompulsions([
        ...targetCompulsions,
        { id, label, rank: targetCompulsions.length + 1 },
      ]);
    }
  };

  const addTargetAvoidance = (label: string, id: string) => {
    if (targetAvoidance.length < 3 && !targetAvoidance.find(t => t.id === id)) {
      setTargetAvoidance([
        ...targetAvoidance,
        { id, label, rank: targetAvoidance.length + 1 },
      ]);
    }
  };

  const moveObsession = (dragIndex: number, hoverIndex: number) => {
    const updated = [...targetObsessions];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setTargetObsessions(updated.map((item, idx) => ({ ...item, rank: idx + 1 })));
  };

  const moveCompulsion = (dragIndex: number, hoverIndex: number) => {
    const updated = [...targetCompulsions];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setTargetCompulsions(updated.map((item, idx) => ({ ...item, rank: idx + 1 })));
  };

  const moveAvoidance = (dragIndex: number, hoverIndex: number) => {
    const updated = [...targetAvoidance];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setTargetAvoidance(updated.map((item, idx) => ({ ...item, rank: idx + 1 })));
  };

  const removeObsession = (id: string) => {
    setTargetObsessions(
      targetObsessions.filter(t => t.id !== id).map((item, idx) => ({ ...item, rank: idx + 1 }))
    );
  };

  const removeCompulsion = (id: string) => {
    setTargetCompulsions(
      targetCompulsions.filter(t => t.id !== id).map((item, idx) => ({ ...item, rank: idx + 1 }))
    );
  };

  const removeAvoidance = (id: string) => {
    setTargetAvoidance(
      targetAvoidance.filter(t => t.id !== id).map((item, idx) => ({ ...item, rank: idx + 1 }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/avoidance')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-foreground">Target Symptoms</h1>
            </div>
            <Button onClick={() => navigate('/severity-interview')}>Continue</Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Card>
              <h3 className="font-semibold text-foreground mb-4">Category Limits</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                  <span className="text-sm text-foreground">Obsessions</span>
                  <span className="text-sm font-semibold text-foreground">
                    {targetObsessions.length}/3
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                  <span className="text-sm text-foreground">Compulsions</span>
                  <span className="text-sm font-semibold text-foreground">
                    {targetCompulsions.length}/3
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                  <span className="text-sm text-foreground">Avoidance</span>
                  <span className="text-sm font-semibold text-foreground">
                    {targetAvoidance.length}/3
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-6 space-y-6">
            <Card className="bg-secondary/30">
              <p className="text-sm text-foreground leading-relaxed">
                Select and prioritize the most prominent symptoms identified during the checklist. Choose up to three obsessions, compulsions, and avoidance behaviors that best represent the patient's current condition. These will be used for severity rating and ongoing tracking.
              </p>
            </Card>

            <Card>
              <h3 className="font-semibold text-foreground mb-3">Obsessions</h3>
              <div className="space-y-2">
                {targetObsessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No target obsessions selected. Add from the sidebar.
                  </p>
                ) : (
                  targetObsessions.map((symptom, index) => (
                    <DraggableTargetCard
                      key={symptom.id}
                      symptom={symptom}
                      index={index}
                      moveCard={moveObsession}
                      onRemove={() => removeObsession(symptom.id)}
                    />
                  ))
                )}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-foreground mb-3">Compulsions</h3>
              <div className="space-y-2">
                {targetCompulsions.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No target compulsions selected. Add from the sidebar.
                  </p>
                ) : (
                  targetCompulsions.map((symptom, index) => (
                    <DraggableTargetCard
                      key={symptom.id}
                      symptom={symptom}
                      index={index}
                      moveCard={moveCompulsion}
                      onRemove={() => removeCompulsion(symptom.id)}
                    />
                  ))
                )}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-foreground mb-3">Avoidance</h3>
              <div className="space-y-2">
                {targetAvoidance.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No target avoidance behaviors selected. Add from the sidebar.
                  </p>
                ) : (
                  targetAvoidance.map((symptom, index) => (
                    <DraggableTargetCard
                      key={symptom.id}
                      symptom={symptom}
                      index={index}
                      moveCard={moveAvoidance}
                      onRemove={() => removeAvoidance(symptom.id)}
                    />
                  ))
                )}
              </div>
            </Card>
          </div>

          <div className="col-span-3">
            <Card>
              <h3 className="font-semibold text-foreground mb-4">Available Symptoms</h3>

              <div className="space-y-4">
                {selectedObsessions.filter(s => s.primary || s.current).length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Obsessions
                    </h4>
                    <div className="space-y-2">
                      {selectedObsessions
                        .filter(s => s.primary || s.current)
                        .map(symptom => (
                          <button
                            key={symptom.id}
                            onClick={() => addTargetObsession(symptom.label, symptom.id)}
                            disabled={
                              targetObsessions.length >= 3 ||
                              targetObsessions.some(t => t.id === symptom.id)
                            }
                            className="w-full flex items-center gap-2 p-2 text-left border border-border rounded-md hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-foreground flex-1">
                              {symptom.label}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {selectedCompulsions.filter(s => s.primary || s.current).length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Compulsions
                    </h4>
                    <div className="space-y-2">
                      {selectedCompulsions
                        .filter(s => s.primary || s.current)
                        .map(symptom => (
                          <button
                            key={symptom.id}
                            onClick={() => addTargetCompulsion(symptom.label, symptom.id)}
                            disabled={
                              targetCompulsions.length >= 3 ||
                              targetCompulsions.some(t => t.id === symptom.id)
                            }
                            className="w-full flex items-center gap-2 p-2 text-left border border-border rounded-md hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-foreground flex-1">
                              {symptom.label}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {selectedAvoidance.filter(s => s.primary || s.current).length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Avoidance
                    </h4>
                    <div className="space-y-2">
                      {selectedAvoidance
                        .filter(s => s.primary || s.current)
                        .map(symptom => (
                          <button
                            key={symptom.id}
                            onClick={() => addTargetAvoidance(symptom.label, symptom.id)}
                            disabled={
                              targetAvoidance.length >= 3 ||
                              targetAvoidance.some(t => t.id === symptom.id)
                            }
                            className="w-full flex items-center gap-2 p-2 text-left border border-border rounded-md hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-foreground flex-1">
                              {symptom.label}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TargetSymptomsScreen() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TargetSymptomsContent />
    </DndProvider>
  );
}
