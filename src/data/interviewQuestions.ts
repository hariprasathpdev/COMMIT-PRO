import { InterviewQuestion } from '../types';

export const CORE_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // Java & OOP
  {
    id: 'iq-1',
    topic: 'Java & OOP',
    question: 'What is the difference between abstraction and encapsulation with real-world examples?',
    answerSummary: 'Abstraction hides internal complexity and exposes essential interface; Encapsulation bundles data and methods while restricting direct access (data hiding).',
    detailedExplanation: `### Abstraction vs Encapsulation

1. **Abstraction (Design Level):**
   - Focuses on *what* an object does rather than *how* it does it.
   - Implemented via \`abstract class\` and \`interface\`.
   - *Real-world:* Driving a car. You press the accelerator pedal (interface) without knowing the fuel injection timing or pistons firing inside the engine.

2. **Encapsulation (Implementation Level):**
   - Focuses on bundling data fields and methods operating on that data into a single unit, and hiding internal representation using access specifiers (\`private\`, \`getters/setters\`).
   - Prevents unauthorized external modification and enforces validation invariants.
   - *Real-world:* A medical capsule where medicines are sealed inside, or an ATM account balance where you cannot set balance to -$500 directly.`,
    codeSnippet: `// Encapsulation: private field with validation
public class BankAccount {
    private double balance; // Data hiding

    public void deposit(double amount) {
        if (amount > 0) this.balance += amount;
    }
    public double getBalance() { return this.balance; }
}

// Abstraction: interface defining contract
public interface PaymentGateway {
    boolean processPayment(double amount);
}`,
    commonFollowUps: [
      'Can an abstract class have constructors in Java?',
      'Can an interface contain method implementations? (Java 8 default & static methods)'
    ],
    isBookmarked: true,
    isMastered: true,
    frequency: 'High',
  },
  {
    id: 'iq-2',
    topic: 'Java & OOP',
    question: 'How does HashMap work internally in Java? What changes occurred in Java 8?',
    answerSummary: 'HashMap uses an array of Node buckets with hashCode() & equals(). In Java 8, when a bucket exceeds 8 collisions and table capacity >= 64, it converts from LinkedList to Red-Black Tree (O(log N)).',
    detailedExplanation: `### Internal Architecture of HashMap

1. **Storage Array:** An array of \`Node<K,V>[] table\` with default initial capacity 16 and load factor 0.75.
2. **Index Calculation:** \`index = (n - 1) & hash(key)\` where hash is bit-shifted to reduce collisions.
3. **Collision Handling:**
   - Pre-Java 8: Separate chaining using Singly Linked List ($O(N)$ worst-case lookup).
   - Java 8+: When items in a single bucket reach \`TREEIFY_THRESHOLD = 8\` AND table capacity $\\ge 64$, the bucket morphs into a balanced Red-Black Tree (\`TreeNode\`), cutting worst-case lookup from $O(N)$ to $O(\\log N)$.
   - When elements drop to $\\le 6$, it untreeifies back to a linked list.
4. **Contract between equals() and hashCode():**
   - If two objects are equal by \`equals()\`, their \`hashCode()\` MUST be identical.
   - If hashCodes are identical, objects are not necessarily equal (collision).`,
    commonFollowUps: [
      'What happens if you use a mutable object as a HashMap key?',
      'What is the difference between HashMap and ConcurrentHashMap?'
    ],
    isBookmarked: false,
    isMastered: false,
    frequency: 'Core',
  },

  // DBMS & SQL
  {
    id: 'iq-3',
    topic: 'DBMS & SQL',
    question: 'Explain ACID properties in relational databases and how isolation levels prevent anomalies.',
    answerSummary: 'ACID guarantees Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrent execution safety), and Durability (committed data survives crashes).',
    detailedExplanation: `### ACID Properties Demystified

1. **Atomicity:** Ensured via Write-Ahead Logging (WAL) and undo logs. Either all operations commit, or the transaction rolls back completely.
2. **Consistency:** Database transitions from one valid state to another valid state, upholding unique, foreign-key, and check constraints.
3. **Isolation:** Governed by transaction isolation levels:
   - *Read Uncommitted:* Dirty reads possible.
   - *Read Committed:* Prevents dirty reads; non-repeatable reads possible.
   - *Repeatable Read:* Prevents non-repeatable reads using MVCC; phantom reads possible in some engines.
   - *Serializable:* Strict two-phase locking or SSI. Zero anomalies, lowest concurrency throughput.
4. **Durability:** Ensured via redo logs flushed to non-volatile disk/SSD storage.`,
    codeSnippet: `-- Dirty Read example avoided at Read Committed level:
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE user_id = 1;
-- If isolation level is READ UNCOMMITTED, another query could see this uncommitted balance
ROLLBACK;`,
    commonFollowUps: [
      'What is the difference between Optimistic and Pessimistic concurrency control?',
      'What is MVCC (Multi-Version Concurrency Control)?'
    ],
    isBookmarked: true,
    isMastered: false,
    frequency: 'Core',
  },
  {
    id: 'iq-4',
    topic: 'DBMS & SQL',
    question: 'What is the difference between Clustered and Non-Clustered Indexes?',
    answerSummary: 'Clustered index defines the physical order of table rows on disk (only 1 per table); Non-clustered index stores index key with a pointer to row data in leaf nodes (multiple per table).',
    detailedExplanation: `### Clustered vs Non-Clustered Indexes

- **Clustered Index:**
  - The leaf nodes of the B+ Tree contain the actual physical table data pages.
  - Exactly **one** clustered index per table (typically the Primary Key).
  - Very fast range scans (\`BETWEEN 100 AND 200\`) because rows are physically sequential.
- **Non-Clustered (Secondary) Index:**
  - The leaf nodes contain the indexed columns + a bookmark / pointer (row ID or primary key value).
  - Multiple non-clustered indexes can exist on a table.
  - Lookups require a secondary step: traverse index B+ Tree $\\to$ read pointer $\\to$ retrieve actual table row (unless it is a *Covering Index*).`,
    commonFollowUps: [
      'What is a covering index and how does it prevent table lookups?',
      'Why is B+ Tree preferred over Binary Search Tree for disk storage?'
    ],
    isBookmarked: false,
    isMastered: true,
    frequency: 'High',
  },

  // Operating Systems
  {
    id: 'iq-5',
    topic: 'Operating Systems',
    question: 'What is the difference between a Process and a Thread? How is context switching handled?',
    answerSummary: 'A Process is an independent program in execution with its own virtual memory space; Threads share the process address space, file descriptors, and heap, but each has its own PC and stack.',
    detailedExplanation: `### Process vs Thread Deep-Dive

| Aspect | Process | Thread (Lightweight Process) |
|---|---|---|
| **Memory Space** | Isolated address space (Text, Data, Heap, Stack). | Shared address space, code segment, and heap; private stack & registers. |
| **Creation Cost** | Heavyweight (\`fork()\` duplicates page tables). | Lightweight; fast thread pool allocation. |
| **Inter-communication** | Requires IPC (Pipes, Sockets, Shared Memory). | Direct memory read/write (requires synchronization like Mutex). |
| **Crash Impact** | Process crash does not affect other processes. | Unhandled fault in one thread can crash the entire host process. |

**Context Switching:**
- CPU saves current registers, Program Counter (PC), and Stack Pointer to Process Control Block (PCB) or Thread Control Block (TCB).
- Process context switches invalidate Translation Lookaside Buffer (TLB) caches, whereas thread switches within the same process retain TLB mappings, making them drastically faster.`,
    commonFollowUps: [
      'What are the 4 Coffman conditions for Deadlock?',
      'What is virtual memory and how does paging prevent external fragmentation?'
    ],
    isBookmarked: true,
    isMastered: false,
    frequency: 'Core',
  },

  // Computer Networks
  {
    id: 'iq-6',
    topic: 'Computer Networks',
    question: 'What happens from the moment you type a URL into a web browser until the page renders?',
    answerSummary: 'DNS resolution (browser cache -> OS -> recursive resolver), TCP 3-way handshake, TLS 1.3 cryptographic handshake, HTTP GET request, server response with HTML/CSS/JS, DOM/CSSOM tree construction and browser paint.',
    detailedExplanation: `### The Full Journey of a Web Request

1. **DNS Lookup:**
   - Browser cache $\\to$ OS cache (/etc/hosts) $\\to$ Local DNS Resolver $\\to$ Root DNS $\\to$ TLD server (.com) $\\to$ Authoritative Name Server $\\to$ Returns IP address.
2. **Transport Layer Connection (TCP 3-Way Handshake):**
   - Client sends \`SYN\`, Server responds with \`SYN-ACK\`, Client acknowledges with \`ACK\`.
3. **TLS Encryption Handshake (HTTPS):**
   - Client Hello (supported ciphers), Server Hello (Certificate with public key), asymmetric key exchange via ECDHE to generate shared symmetric session key.
4. **HTTP Request & Response:**
   - Browser sends HTTP/2 or HTTP/3 GET request with headers.
   - Web server / Reverse proxy routes to backend application; database query executes; returns HTTP 200 with HTML payload.
5. **Browser Rendering Pipeline:**
   - Parses HTML into DOM Tree; parses CSS into CSSOM Tree.
   - Combines into Render Tree; calculates Layout geometry; Paints pixels on screen.`,
    commonFollowUps: [
      'Why is HTTP/3 built on top of UDP (QUIC) rather than TCP?',
      'How does WebSocket upgrade differ from standard HTTP polling?'
    ],
    isBookmarked: false,
    isMastered: true,
    frequency: 'Core',
  },

  // Behavioral & HR
  {
    id: 'iq-7',
    topic: 'Behavioral & HR',
    question: 'Tell me about a time you faced a difficult technical bug or failure in a team project.',
    answerSummary: 'Use the STAR method: Situation (project context), Task (what needed fixing), Action (methodical debugging, isolating root cause, collaborating), Result (quantified fix and post-mortem learning).',
    detailedExplanation: `### The STAR Response Blueprint for Campus HR Rounds

- **Situation:** "During our 6th-semester capstone project, our team built an event booking portal. 48 hours before campus demonstration, the server crashed whenever more than 15 concurrent users tried checking out."
- **Task:** "As backend lead, my responsibility was to diagnose the bottleneck immediately and prevent timeout errors under demonstration load."
- **Action:** "Instead of randomly guessing code, I enabled database query logging and simulated load using Apache Bench. I discovered an N+1 query problem where each ticket booking triggered 15 separate queries inside a loop. I refactored the query into a single batch JOIN with an index on \`event_id\` and introduced connection pooling."
- **Result:** "Average latency plummeted from 4.2 seconds to 65ms, and the system easily sustained 100 concurrent requests without error during the faculty review. We documented this as a team post-mortem checklist for all future endpoints."`,
    commonFollowUps: [
      'How do you handle disagreement with a teammate on architecture choices?',
      'Where do you see yourself in 3 years in our engineering team?'
    ],
    isBookmarked: true,
    isMastered: false,
    frequency: 'High',
  }
];
