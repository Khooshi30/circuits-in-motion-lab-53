import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TipCard } from "@/components/TipCard";
import { Current, checkKCL } from "@/utils/circuitUtils";
import { toast } from "sonner";

const KCL = () => {
  const [currents, setCurrents] = useState<Current[]>([
    { id: "i1", value: 2, direction: "in", label: "I₁" },
    { id: "i2", value: 3, direction: "in", label: "I₂" },
    { id: "i3", value: 4, direction: "out", label: "I₃" },
    { id: "i4", value: 1, direction: "out", label: "I₄" },
  ]);
  
  const [kclResult, setKclResult] = useState(() => checkKCL(currents));
  const [activeTab, setActiveTab] = useState("learn");
  
  useEffect(() => {
    setKclResult(checkKCL(currents));
  }, [currents]);
  
  const handleCurrentChange = (id: string, value: number) => {
    setCurrents(currents.map(c => 
      c.id === id ? { ...c, value } : c
    ));
  };
  
  const handleDirectionToggle = (id: string) => {
    setCurrents(currents.map(c => 
      c.id === id ? { 
        ...c, 
        direction: c.direction === "in" ? "out" : "in" 
      } : c
    ));
  };
  
  const checkEquation = () => {
    const result = checkKCL(currents);
    if (result.isValid) {
      toast.success("Correct! Kirchhoff's Current Law is satisfied.");
    } else {
      toast.error("Not quite. The sum of currents entering doesn't equal the sum of currents leaving.");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Kirchhoff's Current Law (KCL)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Understanding how current behaves at junctions in electrical circuits
        </p>
        
        <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What is Kirchhoff's Current Law?</CardTitle>
                <CardDescription>
                  A fundamental principle of circuit analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Kirchhoff's Current Law (KCL) states that <strong>the sum of all currents entering a node equals the sum of all currents leaving the node</strong>.
                </p>
                <div className="py-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-center font-medium text-blue-800 dark:text-blue-300">
                      ∑I<sub>in</sub> = ∑I<sub>out</sub>
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  This law is based on the conservation of charge - electric charge cannot be created or destroyed at a junction.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Real-world Analogy:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Think of a traffic junction. The number of cars entering the intersection must equal the number of cars leaving it (assuming no cars park or stop within the junction).
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>KCL at a Junction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center p-4">
                    <div className="relative w-60 h-60">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-circuit-junction flex items-center justify-center text-white font-bold">
                        Node
                      </div>
                      
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-24 h-6 bg-circuit-wire flex items-center">
                        <div className="absolute w-full text-center text-white text-xs truncate px-1">
                          I₁ = 2A
                        </div>
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-circuit-wire rotate-45"></div>
                      </div>
                      
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-24 w-6 bg-circuit-wire flex justify-center">
                        <div className="absolute h-full text-center text-white text-xs truncate rotate-90 flex items-center">
                          I₂ = 3A
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-circuit-wire rotate-45"></div>
                      </div>
                      
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-24 h-6 bg-circuit-wire flex items-center justify-end">
                        <div className="absolute w-full text-center text-white text-xs truncate px-1">
                          I₃ = 4A
                        </div>
                        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-circuit-wire rotate-45"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-24 w-6 bg-circuit-wire flex justify-center">
                        <div className="absolute h-full text-center text-white text-xs truncate rotate-90 flex items-center">
                          I₄ = 1A
                        </div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-circuit-wire rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <p className="text-gray-800 dark:text-gray-200 text-center">
                      ∑I<sub>in</sub> = I₁ + I₂ = 2A + 3A = 5A
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-center mt-2">
                      ∑I<sub>out</sub> = I₃ + I₄ = 4A + 1A = 5A
                    </p>
                    <p className="font-medium text-center mt-2 text-green-600 dark:text-green-400">
                      5A = 5A ✓ KCL is satisfied
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Points to Remember</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      KCL applies to any node or junction in a circuit, regardless of how many branches connect to it.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Current directions are arbitrary, but once chosen, you must be consistent throughout your analysis.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      You can also write KCL as: ∑I = 0, where currents entering are positive and currents leaving are negative (or vice versa).
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      KCL is a powerful tool for setting up equations to solve complex circuits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <TipCard title="Pro Tip: Sign Convention">
              <p className="mb-2">
                When solving circuits using KCL, it's helpful to adopt a consistent sign convention:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Currents entering a node are positive (+)</li>
                <li>Currents leaving a node are negative (-)</li>
              </ul>
              <p className="mt-2">
                This allows you to write KCL as: ∑I = 0 for any node.
              </p>
            </TipCard>
          </TabsContent>
          
          <TabsContent value="interactive" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Interactive KCL Demonstration</CardTitle>
                <CardDescription>
                  Adjust the currents to see how KCL works in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-circuit-junction flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      Junction
                    </div>
                    
                    {currents.map((current) => {
                      let positionClass = "";
                      let arrowDirection = "";
                      
                      if (current.id === "i1") {
                        positionClass = "top-1/2 left-2 transform -translate-y-1/2";
                        arrowDirection = current.direction === "in" ? "→" : "←";
                      } else if (current.id === "i2") {
                        positionClass = "top-2 left-1/2 transform -translate-x-1/2";
                        arrowDirection = current.direction === "in" ? "↓" : "↑";
                      } else if (current.id === "i3") {
                        positionClass = "top-1/2 right-2 transform -translate-y-1/2";
                        arrowDirection = current.direction === "in" ? "←" : "→";
                      } else if (current.id === "i4") {
                        positionClass = "bottom-2 left-1/2 transform -translate-x-1/2";
                        arrowDirection = current.direction === "in" ? "↑" : "↓";
                      }
                      
                      const bgColorClass = current.direction === "in" 
                        ? "bg-green-500" 
                        : "bg-red-500";
                        
                      return (
                        <div 
                          key={current.id}
                          className={`absolute ${positionClass} text-white font-semibold`}
                        >
                          <div className={`w-16 h-16 ${bgColorClass} rounded-full flex flex-col items-center justify-center shadow-md animate-pulse-glow`}>
                            <span className="text-2xl">{arrowDirection}</span>
                            <span className="text-sm">{current.label}</span>
                            <span className="text-xs">{current.value}A</span>
                          </div>
                          
                          <div className={`absolute ${
                            current.id === "i1" ? "w-32 h-1 bg-circuit-wire left-full top-1/2 -translate-y-1/2" :
                            current.id === "i2" ? "h-32 w-1 bg-circuit-wire top-full left-1/2 -translate-x-1/2" :
                            current.id === "i3" ? "w-32 h-1 bg-circuit-wire right-full top-1/2 -translate-y-1/2" :
                            "h-32 w-1 bg-circuit-wire bottom-full left-1/2 -translate-x-1/2"
                          }`}>
                            <div className="relative w-full h-full overflow-hidden">
                              <div className={`absolute ${
                                current.direction === "in" ? 
                                  (current.id === "i1" || current.id === "i3" ? "animate-current-flow" : "animate-current-flow") : 
                                  (current.id === "i1" || current.id === "i3" ? "animate-current-flow" : "animate-current-flow")
                              } ${
                                current.id === "i1" || current.id === "i3" ? "w-4 h-1 bg-white/50" : "w-1 h-4 bg-white/50"
                              }`}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Adjust Currents</h3>
                    <div className="space-y-6">
                      {currents.map((current) => (
                        <div key={current.id} className="space-y-2">
                          <div className="flex justify-between">
                            <Label>{current.label}</Label>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant={current.direction === "in" ? "default" : "outline"}
                                onClick={() => handleDirectionToggle(current.id)}
                              >
                                In
                              </Button>
                              <Button 
                                size="sm" 
                                variant={current.direction === "out" ? "default" : "outline"}
                                onClick={() => handleDirectionToggle(current.id)}
                              >
                                Out
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Slider 
                              min={0} 
                              max={10} 
                              step={0.1} 
                              value={[current.value]}
                              onValueChange={([value]) => handleCurrentChange(current.id, value)}
                              className="flex-grow"
                            />
                            <div className="w-16">
                              <Input 
                                type="number" 
                                min={0}
                                max={10}
                                step={0.1}
                                value={current.value} 
                                onChange={(e) => handleCurrentChange(current.id, parseFloat(e.target.value) || 0)}
                                className="text-center"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">KCL Validation</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-700 dark:text-gray-300 mb-1">Sum of Currents Entering:</p>
                            <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                              <p className="font-medium text-green-700 dark:text-green-300">
                                ∑I<sub>in</sub> = {kclResult.inSum.toFixed(2)} A
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-gray-700 dark:text-gray-300 mb-1">Sum of Currents Leaving:</p>
                            <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                              <p className="font-medium text-red-700 dark:text-red-300">
                                ∑I<sub>out</sub> = {kclResult.outSum.toFixed(2)} A
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t">
                            <p className="text-gray-700 dark:text-gray-300 mb-1">KCL Equation:</p>
                            <div className={`p-2 rounded ${
                              kclResult.isValid 
                                ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" 
                                : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                            }`}>
                              <p className="font-medium">
                                {kclResult.inSum.toFixed(2)} A {kclResult.isValid ? "=" : "≠"} {kclResult.outSum.toFixed(2)} A
                                {kclResult.isValid 
                                  ? " ✓ KCL Satisfied" 
                                  : ` (Difference: ${kclResult.difference.toFixed(2)} A)`}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            onClick={checkEquation} 
                            className="w-full"
                            variant={kclResult.isValid ? "default" : "secondary"}
                          >
                            {kclResult.isValid ? "Verify (Correct!)" : "Check My Circuit"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <TipCard title="Understanding KCL Intuitively">
              <p>
                KCL is based on the principle of conservation of charge. Since charge cannot be created or destroyed at a junction, 
                all the charge (current) flowing into the junction must also flow out.
              </p>
              <p className="mt-2">
                Try making all currents "in" or all "out" - notice how KCL will fail in these cases since there must always be
                a balance between incoming and outgoing currents.
              </p>
            </TipCard>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>
                  Test your understanding of Kirchhoff's Current Law
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Problem 1: Simple Junction</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      At a junction, there are three currents: I₁ = 5A (entering), I₂ = 2A (entering), and I₃ (leaving).
                      According to KCL, what must be the value of I₃?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                      <Input 
                        type="number" 
                        placeholder="Enter I₃ value..."
                        className="max-w-xs"
                      />
                      <Button>Check Answer</Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Try working out the equation before checking your answer.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Problem 2: Complex Junction</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      At a node, currents I₁ = 3A and I₂ = 4A are entering, while I₃ = 2A and I₄ = 1A are leaving.
                      Is KCL satisfied? If not, what additional current (entering or leaving) would be needed?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                      <div className="flex gap-2">
                        <Button variant="outline">KCL is satisfied</Button>
                        <Button variant="outline">KCL is NOT satisfied</Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Analyze the given currents and determine if they satisfy Kirchhoff's Current Law.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KCL;
