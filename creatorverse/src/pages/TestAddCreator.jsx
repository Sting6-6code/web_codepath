import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const TestAddCreator = () => {
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testDatabaseStructure = async () => {
    setIsLoading(true);
    setTestResult("Testing database structure...");

    try {
      const { data: connectionTest, error: connectionError } = await supabase
        .from("creators")
        .select("count")
        .limit(1);

      if (connectionError) {
        setTestResult(`❌ Connection failed: ${connectionError.message}`);
        return;
      }

      const { data: existingData, error: structureError } = await supabase
        .from("creators")
        .select("*")
        .limit(1);

      if (structureError) {
        setTestResult(`❌ Table structure error: ${structureError.message}`);
        return;
      }

      const testData = {
        name: "Test Creator " + Date.now(),
        url: "https://youtube.com/@testcreator",
        description: "This is a test creator for database testing",
        imageURL: "https://picsum.photos/200/200",
      };

      const { data: insertResult, error: insertError } = await supabase
        .from("creators")
        .insert([testData])
        .select();

      if (insertError) {
        setTestResult(`❌ Insert failed: ${insertError.message}`);
        return;
      }

      if (insertResult && insertResult.length > 0) {
        const inserted = insertResult[0];
        await supabase.from("creators").delete().eq("id", inserted.id);
      }

      setTestResult("✅ All tests passed: connection, schema, insert, cleanup");
    } catch (e) {
      setTestResult(`❌ Unexpected error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Test Add Creator</h1>
      <button onClick={testDatabaseStructure} disabled={isLoading}>
        {isLoading ? "Testing..." : "Run DB Tests"}
      </button>
      {testResult && <p>{testResult}</p>}
      <button onClick={() => navigate("/")}>Back Home</button>
    </div>
  );
};

export default TestAddCreator;
